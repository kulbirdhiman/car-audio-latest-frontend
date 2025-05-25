const HelpPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Help & Support</h1>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">📦 How do I track my order?</h2>
      <p className="text-gray-700 mt-2">
        As soon as your order is out for delivery, you&apos;ll receive a shipment tracking number via email. This email also includes a dedicated tracking link where you can track your package in real-time.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">🌍 Where does Kayhan Audio ship?</h2>
      <p className="text-gray-700 mt-2">
        We ship worldwide! However, if you live in a remote area and do not see your location on our checkout page, it likely means we don&apos;t deliver there. Contact us—we&apos;ll try our best to help.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">🔁 What is the replacement policy?</h2>
      <p className="text-gray-700 mt-2">
        If you received the wrong, broken, or non-functioning product, we&apos;ll replace it without any hassle. Just contact us with a valid reason. If we can&apos;t fulfill your request, we&apos;ll refund your money to your PayPal account.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">🚚 When will my product be out for delivery?</h2>
      <p className="text-gray-700 mt-2">
        We begin processing your item as soon as we receive payment confirmation. Orders are shipped via trusted carriers like FedEx, UPS, and DHL, and typically take 3 to 15 days, depending on your location.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">↩️ What is your return policy?</h2>
      <p className="text-gray-700 mt-2">
        If you wish to return a product due to personal reasons (e.g., change of mind), you&apos;ll be responsible for the return shipping cost. If the issue is on our end (e.g., wrong product sent), we&apos;ll handle the entire return process and costs.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">📦 I haven’t received my package yet</h2>
      <p className="text-gray-700 mt-2">
        Delays can happen due to weather or other unexpected reasons. If your order hasn&apos;t arrived on time, please call us immediately so we can help locate your package.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">💳 What payment methods do you accept?</h2>
      <p className="text-gray-700 mt-2">
        We accept a variety of payment methods including:
      </p>
      <ul className="list-disc list-inside text-gray-700 mt-2">
        <li>Credit cards (VISA, MasterCard, American Express, Discover)</li>
        <li>PayPal</li>
        <li>Other similar payment services</li>
      </ul>
      <p className="text-gray-700 mt-2">
        We do not store your card information, ensuring a secure and private shopping experience.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">❌ I changed my mind and want to cancel my order</h2>
      <p className="text-gray-700 mt-2">
        If you decide to cancel, act fast. Contact us immediately and explain your situation. If your case is valid and the order hasn&apos;t shipped yet, we&apos;ll issue a full or partial refund to your PayPal account.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6">⏳ Delivery is taking longer than expected?</h2>
      <p className="text-gray-700 mt-2">
        Sometimes delays happen due to external factors. If you believe your delivery is delayed, feel free to contact us. We&apos;ll investigate the issue and provide you with an update.
      </p>

      <p className="text-center text-gray-800 font-bold text-lg mt-8">
        Still have questions? <br />
        <span className="text-blue-600 underline cursor-pointer">Contact our support team</span> — we&apos;re here to help!
      </p>
    </div>
  );
};

export default HelpPage;
