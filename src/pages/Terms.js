import React from "react";

export default function Terms() {
  return (
    <div style={{
      maxWidth: 900,
      margin: "2.5rem auto",
      padding: "2rem 1rem",
      background: "#fff",
      borderRadius: 10,
      boxShadow: "0 2px 16px #b1ae8d29"
    }}>
      <h1 style={{
        color: "#40652a",
        fontWeight: 700,
        fontSize: "2.1rem",
        marginBottom: "1.1rem"
      }}>
        Terms &amp; Conditions
      </h1>

      <p><strong>Last updated:</strong> [30/07/2025]</p>

      <p>
        Welcome to Samrin Organic Mehndi. By using our website and services, you agree to the following terms and conditions. Please read them carefully.
      </p>

      <h2 style={{marginTop: "1.3rem", color: "#7c6a43", fontSize: "1.2rem"}}>Use of Website</h2>
      <ul style={{marginLeft: 22, marginBottom: 13}}>
        <li>You must be at least 18 years old or visiting under the supervision of a parent or guardian.</li>
        <li>You agree not to use the website for any purpose that is unlawful or prohibited by these terms.</li>
      </ul>

      <h2 style={{marginTop: "1.1rem", color: "#7c6a43", fontSize: "1.2rem"}}>Orders &amp; Payments</h2>
      <ul style={{marginLeft: 22, marginBottom: 13}}>
        <li>All orders are subject to acceptance and availability.</li>
        <li>Prices are listed in INR and may change without notice.</li>
        <li>Payments must be completed before products are shipped or delivered.</li>
      </ul>

      <h2 style={{marginTop: "1.1rem", color: "#7c6a43", fontSize: "1.2rem"}}>Intellectual Property</h2>
      <p>
        All content on this website, including text, graphics, logos, images, and designs, is the property of Samrin Organic Mehndi or its suppliers and protected by relevant copyright and trademark laws. Unauthorized use is strictly prohibited.
      </p>

      <h2 style={{marginTop: "1.1rem", color: "#7c6a43", fontSize: "1.2rem"}}>Limitation of Liability</h2>
      <p>
        We strive to ensure that all information on our website is accurate, but we make no warranties. We are not responsible for any loss or damage arising from use of our website or products.
      </p>

      <h2 style={{marginTop: "1.1rem", color: "#7c6a43", fontSize: "1.2rem"}}>Privacy</h2>
      <p>
        Please refer to our <a href="/privacy-policy" style={{color: "#40652a"}}>Privacy Policy</a> for details about how your personal information is handled.
      </p>

      <h2 style={{marginTop: "1.1rem", color: "#7c6a43", fontSize: "1.2rem"}}>Changes to These Terms</h2>
      <p>
        We may revise these terms from time to time. Updated terms will take effect once posted on this page.
      </p>

      <h2 style={{marginTop: "1.1rem", color: "#7c6a43", fontSize: "1.2rem"}}>Contact Us</h2>
      <p>
        If you have any questions about these Terms &amp; Conditions, please email us at <a href="mailto:yourmail@gmail.com">samrinmehnadiart@gmail.com</a>.
      </p>
    </div>
  );
}
