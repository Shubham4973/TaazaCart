const ReturnRefundPolicy = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Return & Refund Policy
        </h1>
        <p className="text-gray-600 mb-8">
          At <span className="font-semibold text-primary">TaazaCart</span>, we
          want you to be completely satisfied with your shopping experience.
          Please read our return and refund policy carefully to understand your
          rights and options.
        </p>

        {/* Sections */}
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              1. Eligibility for Returns
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Items must be returned within <b>2 days</b> of delivery.
              </li>
              <li>
                Perishable items like fruits, vegetables, and dairy can only be
                returned if found damaged or spoiled at delivery.
              </li>
              <li>
                Items must be unused, in original packaging, and accompanied by
                proof of purchase.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              2. Non-Returnable Items
            </h2>
            <p>Certain items cannot be returned, including:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Opened or used food products.</li>
              <li>Personal care and hygiene items.</li>
              <li>Discounted or clearance products.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              3. Refunds
            </h2>
            <p>
              Once your return is approved, your refund will be processed within{" "}
              <b>5-7 business days</b> to your original payment method.
            </p>
            <p className="mt-2">
              In case of Cash on Delivery orders, refunds will be issued as{" "}
              <b>store credit</b> or via bank transfer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              4. How to Initiate a Return
            </h2>
            <p>
              To request a return, please contact our customer support team at{" "}
              <a
                href="mailto:support@taazacart.com"
                className="text-primary hover:underline"
              >
                support@taazacart.com
              </a>{" "}
              or call us at{" "}
              <a
                href="tel:+911234567890"
                className="text-primary hover:underline"
              >
                +91-123-456-7890
              </a>
              .
            </p>
          </section>
        </div>

        {/* Last Note */}
        <div className="mt-10 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-gray-700 text-sm">
            Please note: TaazaCart reserves the right to amend this policy at
            any time without prior notice. The latest version will always be
            available on our website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;
