const PaymentMethods = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Payment Methods
        </h1>
        <p className="text-gray-600 mb-6">
          To make your shopping experience smooth, we support a wide range of
          secure payment options.
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2">Accepted Methods</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Credit & Debit Cards (Visa, Mastercard, RuPay)</li>
              <li>Cash on Delivery (COD)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Secure Transactions</h2>
            <p>
              All payments are processed through secure gateways to ensure your
              data remains safe and encrypted.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
