import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import "./TeacherManagement.css";

const TeacherWallet = () => {
  const [walletData, setWalletData] = useState({
    balance: 0,
    totalEarnings: 0,
    pendingAmount: 0,
    withdrawnAmount: 0
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigate('/login');
        return;
      }

      // Get teacher's wallet data
      const walletDoc = await getDoc(doc(db, "teacherWallets", currentUser.uid));
      if (walletDoc.exists()) {
        setWalletData(walletDoc.data());
      } else {
        // Create wallet if it doesn't exist
        const newWallet = {
          balance: 0,
          totalEarnings: 0,
          pendingAmount: 0,
          withdrawnAmount: 0,
          createdAt: new Date().toISOString()
        };
        await updateDoc(doc(db, "teacherWallets", currentUser.uid), newWallet);
        setWalletData(newWallet);
      }

      // Get teacher's transactions
      const transactionsQuery = query(
        collection(db, "teacherTransactions"),
        where("teacherId", "==", currentUser.uid)
      );
      const transactionsSnapshot = await getDocs(transactionsQuery);
      const transactionsList = transactionsSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTransactions(transactionsList);

    } catch (error) {
      console.error("Error fetching wallet data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (amount > walletData.balance) {
      alert("Insufficient balance");
      return;
    }

    try {
      const currentUser = auth.currentUser;
      const newBalance = walletData.balance - amount;
      const newWithdrawnAmount = walletData.withdrawnAmount + amount;

      // Update wallet balance
      await updateDoc(doc(db, "teacherWallets", currentUser.uid), {
        balance: newBalance,
        withdrawnAmount: newWithdrawnAmount
      });

      // Create withdrawal transaction
      const transaction = {
        teacherId: currentUser.uid,
        type: "withdrawal",
        amount: amount,
        description: "Withdrawal to bank account",
        status: "completed",
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, "teacherTransactions"), transaction);

      // Update local state
      setWalletData(prev => ({
        ...prev,
        balance: newBalance,
        withdrawnAmount: newWithdrawnAmount
      }));

      setWithdrawAmount("");
      setShowWithdrawModal(false);
      fetchWalletData(); // Refresh data
      alert("Withdrawal successful!");

    } catch (error) {
      console.error("Error processing withdrawal:", error);
      alert("Withdrawal failed. Please try again.");
    }
  };

  const calculateEarnings = async () => {
    try {
      const currentUser = auth.currentUser;
      
      // Get teacher's classes
      const classesQuery = query(
        collection(db, "classes"),
        where("teacherId", "==", currentUser.uid)
      );
      const classesSnapshot = await getDocs(classesQuery);
      
      let totalEarnings = 0;
      classesSnapshot.docs.forEach(doc => {
        const classData = doc.data();
        const studentCount = classData.studentCount || 0;
        const price = classData.price || 0;
        totalEarnings += studentCount * price;
      });

      // Update wallet with calculated earnings
      await updateDoc(doc(db, "teacherWallets", currentUser.uid), {
        totalEarnings: totalEarnings,
        balance: totalEarnings - walletData.withdrawnAmount
      });

      setWalletData(prev => ({
        ...prev,
        totalEarnings: totalEarnings,
        balance: totalEarnings - prev.withdrawnAmount
      }));

    } catch (error) {
      console.error("Error calculating earnings:", error);
    }
  };

  if (loading) {
    return (
      <div className="teacher-loading">
        <div className="loading-spinner"></div>
        <p>Loading wallet...</p>
      </div>
    );
  }

  return (
    <div className="teacher-management">
      <div className="teacher-header">
        <h1>Teacher Wallet</h1>
        <button onClick={() => navigate('/dashboard/teacher')} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <div className="wallet-overview">
        <div className="wallet-stats">
          <div className="stat-card">
            <span className="stat-number">₹{walletData.balance.toLocaleString()}</span>
            <span className="stat-label">Available Balance</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">₹{walletData.totalEarnings.toLocaleString()}</span>
            <span className="stat-label">Total Earnings</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">₹{walletData.withdrawnAmount.toLocaleString()}</span>
            <span className="stat-label">Total Withdrawn</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">₹{walletData.pendingAmount.toLocaleString()}</span>
            <span className="stat-label">Pending Amount</span>
          </div>
        </div>

        <div className="wallet-actions">
          <button 
            className="withdraw-btn"
            onClick={() => setShowWithdrawModal(true)}
            disabled={walletData.balance <= 0}
          >
            Withdraw Funds
          </button>
          <button 
            className="calculate-btn"
            onClick={calculateEarnings}
          >
            Calculate Earnings
          </button>
        </div>
      </div>

      <div className="transactions-section">
        <h3>Transaction History</h3>
        <div className="transactions-list">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <h4>{transaction.description}</h4>
                  <p>{new Date(transaction.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="transaction-amount">
                  <span className={`amount ${transaction.type}`}>
                    {transaction.type === 'withdrawal' ? '-' : '+'}₹{transaction.amount.toLocaleString()}
                  </span>
                  <span className={`status ${transaction.status}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No transactions yet.</p>
          )}
        </div>
      </div>

      {showWithdrawModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Withdraw Funds</h2>
            <p>Available Balance: ₹{walletData.balance.toLocaleString()}</p>
            
            <div className="form-group">
              <label>Withdrawal Amount (₹)</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                max={walletData.balance}
                min="1"
              />
            </div>

            <div className="modal-actions">
              <button onClick={handleWithdraw} className="withdraw-btn">
                Confirm Withdrawal
              </button>
              <button 
                onClick={() => setShowWithdrawModal(false)} 
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherWallet; 