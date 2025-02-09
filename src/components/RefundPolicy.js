import React from "react";
import "./RefundPolicy.css";

const RefundPolicy = () => {
  return (
    <div className="refund-policy-container">
      <h1 className="refund-policy-title">REFUND POLICY</h1>
      <ul className="refund-policy-list">
        <li>100% Refund policy is there for any unused classes/credits</li>
        <li>Refunds will be settled in 5-7 working days </li>
        <li>The kit payment is non-refundable for the processed items</li>
        <li>Payment received are not refundable after 3 classes since joining.</li>
        <li>
          For courses with 50 sessions: The Refund validity period is half-yearly,
          i.e., unused classes/credits can be refunded back within half-yearly
          from the date of joining the course.
        </li>
        <li>
          For courses with 51-100 sessions: The refund validity period is 1 year.
        </li>
        <li>
          For courses with 100+ sessions: The refund validity period is 2 years.
        </li>
        <li>
          The refund policy is applicable only for the paid class credits. It is
          not applicable on any class credits earned via referrals or anything
          class credits gifted by Child Tynker.
        </li>
        <li>
          We are committed to providing a superlative learning experience to your
          kids using the most innovative techniques. However, at any point, if
          you find that your kid's learning experience is not what you expected,
          please email us at <a href="mailto:support@childtynker.com">support@childtynker.com</a>.
        </li>
      </ul>
    </div>
  );
};

export default RefundPolicy;