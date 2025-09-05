// RazorpayTest.js
import React, { useEffect } from "react";

const RazorpayTest = () => {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const openRazorpay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Failed to load Razorpay SDK. Check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_0Pmy6dBozgLBY0", // 🔑 Replace with your Test API Key
      amount: 100, // 💰 amount in paise (₹1 = 100 paise)
      currency: "INR",
      name: "RxProz",
      description: "Test Transaction",
      image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
      handler: function (response) {
        alert("Payment Successful!");
        console.log("Razorpay response:", response);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Test address",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    openRazorpay();
  }, []);

  return null; // No UI rendered
};

export default RazorpayTest;
