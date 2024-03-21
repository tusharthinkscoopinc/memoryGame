import React, { useEffect } from 'react';
import { Parser } from 'html-to-react';

const rawHTML = `<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Terms of Use</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 3rem;
    }

    h1 {
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;
    }

    h2 {
      font-size: 18px;
    }

    p {
      margin-bottom: 10px;
    }

    .section {
      margin-bottom: 30px;
    }

    .section-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .sub-section {
      margin-top: 10px;
    }

    .sub-section-title {
      font-size: 16px;
      font-weight: bold;
    }

    .sub-section p {
      margin-left: 20px;
    }

    .sub-section ol {
      margin-left: 40px;
    }

    .contact-info {
      margin-top: 30px;
    }

    .contact-info p {
      margin-bottom: 5px;
    }

    .contact-info strong {
      display: inline-block;
      width: 120px;
    }
  </style>
</head>

<body>
  <h1>Terms of Use</h1>
  <div class="section">
    <h2 class="section-title">Effective Date: 9 Jan 2024</h2>
    <p>1. Acceptance of Terms</p>
    <p>2. Welcome to the "Talent Swap". These Terms of Use (the "Terms") govern your access to and use of the Website provided by Talent Swap ("Talent Swap," "we," "us," or "our"). By accessing or using the Website, you agree to be bound by these Terms. If you do not agree to these Terms, please do not access or use the Website.</p>
  </div>

  <div class="section">
    <h2 class="section-title">Use of the Website</h2>
    <div class="sub-section">
      <h3 class="sub-section-title">2.1 License</h3>
      <p>Subject to your compliance with these Terms, Talent Swap grants you a limited, non-exclusive, non-transferable, and revocable license to use the Website for your personal, non-commercial use.</p>
    </div>
    <div class="sub-section">
      <h3 class="sub-section-title">2.2 Eligibility</h3>
      <p>By accessing or using the Website, you represent and warrant that you are at least 18 years of age or have reached the age of majority in your jurisdiction. If you are accessing or using the Website on behalf of a company or other legal entity, you represent and warrant that you have the authority to bind such entity to these Terms.</p>
    </div>
    <div class="sub-section">
      <h3 class="sub-section-title">2.3 Prohibited Conduct</h3>
      <ol>
        <li>
          <p>Violate any applicable laws, regulations, or third-party rights.</p>
        </li>
        <li>
          <p>Use the Website in any manner that could disable, damage, or impair the Website or interfere with any other party's use of the Website.</p>
        </li>
        <li>
          <p>Attempt to gain unauthorized access to any portion of the Website or any other systems or networks connected to the Website.</p>
        </li>
        <li>
          <p>Use any robot, spider, or other automatic device, process, or means to access the Website for any purpose, including monitoring or copying any of the content available on the Website.</p>
        </li>
        <li>
          <p>Reverse engineer, decompile, or disassemble any aspect of the Website or attempt to derive the source code of the Website.</p>
        </li>
      </ol>
    </div>
    <div class="sub-section">
      <h3 class="sub-section-title">2.4 Account Registration</h3>
      <p>In order to access certain features of the Website, you may need to register an account. You agree to provide accurate, current, and complete information during the registration process and to keep your account information updated. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Talent Swap reserves the right to suspend or terminate your account if any information provided by you is found to be inaccurate, incomplete, or misleading.</p>
    </div>
    <div class="sub-section">
      <h3 class="sub-section-title">2.5 Modifications to the Website</h3>
      <p>Talent Swap reserves the right to modify, suspend, or discontinue the Website at any time without prior notice. We may release updates, upgrades, or new versions of the Website, which may require you to download and install the updates to continue using the Website.</p>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Intellectual Property Rights</h2>
    <div class="sub-section">
      <h3 class="sub-section-title">3.1 Ownership</h3>
      <p>The Website and all content, features, and functionality provided through the Website are owned by Talent Swap or its licensors and are protected by copyright, trademark, and other intellectual property laws. You acknowledge and agree that Talent Swap retains all rights, title, and interest in and to the Website, including all intellectual property rights.</p>
    </div>
    <div class="sub-section">
      <h3 class="sub-section-title">3.2 Limited License</h3>
      <p>Subject to your compliance with these Terms, Talent Swap grants you a limited, non-exclusive, non-transferable, and revocable license to access and use the Website for your personal, non-commercial use.</p>
    </div>
    <div class="sub-section">
      <h3 class="sub-section-title">3.3 Restrictions</h3>
      <ol>
        <li>
          <p>Modify, adapt, translate, or create derivative works based on the Website.</p>
        </li>
        <li>
          <p>Remove, alter, or obscure any copyright, trademark, or other proprietary rights notices from the Website.</p>
        </li>
        <li>
          <p>Use any automated system or software to extract data from the Website.</p>
        </li>
      </ol>
    </div>
    <div class="sub-section">
      <h3 class="sub-section-title">3.4 Feedback</h3>
      <p>If you provide Talent Swap with any feedback, suggestions, or comments regarding the Website ("Feedback"), Talent Swap shall have the right to use, disclose, reproduce, license, and otherwise exploit the Feedback without any restrictions or obligations to you.</p>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">User Content</h2>
    <div class="sub-section">
      <h3 class="sub-section-title">4.1 User Content Ownership</h3>
      <p>The Website may allow you to submit or provide content, including text, images, or other materials ("User Content"). You retain ownership of any intellectual property rights that you hold in the User Content.</p>
    </div>
    <div class="sub-section">
      <h3 class="sub-section-title">4.2 License to User Content</h3>
      <p>By submitting or providing User Content through the Website, you grant Talent Swap a non-exclusive, worldwide, perpetual, irrevocable, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the User Content in connection with the operation of the Website and Talent Swap's business.</p>
    </div>
    <div class="sub-section">
      <h3 class="sub-section-title">4.3 Prohibited User Content</h3>
      <ol>
        <li>
          <p>Infringes or violates any third-party rights, including intellectual property rights, privacy rights, or publicity rights.</p>
        </li>
        <li>
          <p>Contains any defamatory, obscene, or unlawful material.</p>
        </li>
      </ol>
    </div>
    <div class="sub-section">
      <h3 class="sub-section-title">4.4 Monitoring User Content</h3>
      <p>Talent Swap does not pre-screen or monitor User Content, but reserves the right to remove or disable access to any User Content that violates these Terms or is otherwise objectionable.</p>
    </div>
    <div class="sub-section">
      <h3 class="sub-section-title">4.5 Copyright Infringement</h3>
      <p>Talent Swap respects the intellectual property rights of others and expects its users to do the same. If you believe that any User Content infringes your copyrights, please contact us at [contact email] with the following information:</p>
      <ol>
        <li>
          <p>A description of the copyrighted work that you claim has been infringed.</p>
        </li>
        <li>
          <p>The location of the infringing material on the Website.</p>
        </li>
        <li>
          <p>Your contact information, including your name, address, telephone number, and email address.</p>
        </li>
        <li>
          <p>A statement by you that you have a good faith belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</p>
        </li>
        <li>
          <p>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</p>
        </li>
      </ol>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">Privacy</h2>
    <p>Your use of the Website is subject to our Privacy Policy, which describes how we collect, use, and disclose your information. By accessing or using the Website, you consent to the collection, use, and disclosure of your information as described in our Privacy Policy.</p>
  </div>

  <div class="section">
    <h2 class="section-title">Disclaimer of Warranty</h2>
    <p>The Website is provided on an "as is" and "as available" basis. Talent Swap does not warrant that the Website will be error-free, uninterrupted, or free of viruses or other harmful components. Your use of the Website is at your own risk.</p>
  </div>

  <div class="section">
    <h2 class="section-title">Limitation of Liability</h2>
    <p>To the maximum extent permitted by applicable law, Talent Swap and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to damages for lost profits, data loss, or other intangible losses, arising out of or in connection with your use of or inability to use the Website.</p>
  </div>

  <div class="section">
    <h2 class="section-title">Indemnification</h2>
    <p>You agree to indemnify, defend, and hold harmless Talent Swap and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses, including reasonable attorneys' fees, arising out of or in connection with your use of the Website or any violation of these Terms.</p>
  </div>

  <div class="section">
    <h2 class="section-title">Governing Law and Dispute Resolution</h2>
    <p>These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any dispute arising out of or in connection with these Terms shall be exclusively submitted to the courts of [Jurisdiction].</p>
  </div>

  <div class="section">
    <h2 class="section-title">Changes to the Terms</h2>
    <p>Talent Swap reserves the right to modify or update these Terms at any time, effective upon posting the updated Terms on the Website. Your continued use of the Website after the posting of any changes to the Terms signifies your acceptance of such changes.</p>
  </div>

  <div class="section">
    <h2 class="section-title">Termination</h2>
    <p>Talent Swap may, in its sole discretion, terminate or suspend your access to the Website for any reason, including without limitation, if you violate these Terms or engage in any conduct that Talent Swap believes is harmful to the Website or its users.</p>
  </div>

  <div class="section">
    <h2 class="section-title">Contact Us</h2>
    <p>If you have any questions or concerns about these Terms, please contact us at 
    <a href="mailto:support@Talent Swap.com">support@Talent Swap.com</a>.</p>
  </div>

  <div class="section">
    <p>By accessing or using the Website, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Use.</p>
  </div>
</body>

</html>`;

function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="layoutTalent Swap__body">
      <div>{Parser().parse(rawHTML)}</div>
    </div>
  );
}

export default TermsAndConditions;
