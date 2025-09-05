const DeliveryInformation = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Delivery Information
        </h1>
        <p className="text-gray-600 mb-8">
          At <span className="font-semibold text-primary">TaazaCart</span>, we
          aim to provide you with the fastest and most reliable delivery
          service.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2">Delivery Timelines</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Standard delivery within <b>30 minutes</b> inside city limits.
              </li>
              <li>Same-day delivery for all orders placed before 6:00 PM.</li>
              <li>Express delivery available at extra charge.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Delivery Charges</h2>
            <p>
              Free delivery on orders above <b>₹499</b>. Orders below this
              amount may include a small delivery fee.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Tracking</h2>
            <p>
              Once your order is dispatched, you will receive a tracking link
              via SMS or email.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInformation;
