import TempUserModel from "../models/tempuser.model.js";
import UserModel from "../models/user.model.js";
import {
  CreateTempUser,
  LoginUserCheck,
  ResendUserOtplogic,
  VerifyUserOtp,
} from "../services/user.service.js";
import "../lib/passport.js";
import transporter from "../lib/mailsender.js";

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(406).json({
        error: "Invalid request data. Please Only String Data is allowed!",
      });
    }

    const ValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!ValidEmail.test(email)) {
      return res.status(406).json({
        message: "Invalid Email Address!",
      });
    }

    const AllowedEmails = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "live.com",
      "icloud.com",
      "mail.com",
      "protonmail.com",
    ];

    if (!AllowedEmails.includes(email.split("@")[1])) {
      return res.status(406).json({
        message: "Invalid Email Address!",
      });
    }

    const ifTempUserExists = await TempUserModel.findOne({ email });

    if (ifTempUserExists) {
      return res.status(202).json({
        error: "Just Verfy Your Email Via OTP.",
      });
    }

    const ifUserExists = await UserModel.findOne({ email });

    if (ifUserExists) {
      return res.status(400).json({
        error: "User Already Exists. Please Login !",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    const hashedPassword = await UserModel.HashPassword(password);

    const tempUser = await CreateTempUser({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
    });

    if (!tempUser) {
      return res.status(500).json({
        error: "Could Not Create User. Please Try Again !",
      });
    }

    const info = transporter.sendMail({
      from: "VARON AI <endgamingai2@gmail.com>",
      to: email,
      subject: "🔐 VARON AI – Verify Your Identity",
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>VARON AI – Verification</title>

<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

body {
  margin: 0;
  padding: 0;
  background: #f9fafb;
  font-family: 'JetBrains Mono', monospace;
  color: #0f172a;
}

.wrapper {
  max-width: 620px;
  margin: 40px auto;
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 25px 70px rgba(16, 185, 129, 0.18);
  border: 1px solid #e5e7eb;
}

/* Header */
.header {
  padding: 42px 32px;
  text-align: center;
  background: linear-gradient(135deg, #10b981, #14b8a6);
  color: white;
}

.logo {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 3px;
}

.tagline {
  margin-top: 8px;
  font-size: 14px;
  letter-spacing: 3px;
  opacity: 0.9;
  text-transform: uppercase;
}

/* Body */
.content {
  padding: 42px 36px;
}

.title {
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 12px;
}

.subtitle {
  text-align: center;
  font-size: 15px;
  color: #475569;
  line-height: 1.8;
  margin-bottom: 36px;
}

/* OTP Card */
.otp-card {
  background: linear-gradient(135deg, #ecfdf5, #f0fdfa);
  border: 1px solid #a7f3d0;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  margin-bottom: 36px;
}

.otp-label {
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #047857;
  margin-bottom: 14px;
}

.otp {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 14px;
  color: #065f46;
}

/* Info */
.info {
  font-size: 14px;
  color: #334155;
  line-height: 1.9;
  margin-bottom: 30px;
}

.info strong {
  color: #059669;
}

/* Warning */
.warning {
  background: #fff1f2;
  border: 1px solid #fecdd3;
  border-radius: 14px;
  padding: 20px;
  font-size: 14px;
  color: #7f1d1d;
  line-height: 1.8;
}

/* Footer */
.footer {
  background: #f0fdf4;
  padding: 26px 30px;
  border-top: 1px solid #d1fae5;
  text-align: center;
}

.footer-text {
  font-size: 12px;
  color: #475569;
  margin-bottom: 18px;
}

.system {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  font-size: 12px;
}

.system div span {
  display: block;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #059669;
  margin-bottom: 4px;
}

.system div strong {
  color: #0f172a;
}

@media (max-width: 600px) {
  .otp {
    font-size: 36px;
    letter-spacing: 10px;
  }
  .system {
    grid-template-columns: 1fr;
  }
}
</style>
</head>

<body>
  <div class="wrapper">

    <!-- Header -->
    <div class="header">
      <div class="logo">VARON AI</div>
      <div class="tagline">Command • Delegate • Execute</div>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="title">Verify Your Identity</div>
      <div class="subtitle">
        To continue accessing your intelligent AI command system,
        please confirm your identity using the verification code below.
      </div>

      <!-- OTP -->
      <div class="otp-card">
        <div class="otp-label">Your Verification Code</div>
        <div class="otp">${otp}</div>
      </div>

      <div class="info">
        • This code is valid for <strong>5 minutes</strong><br />
        • Generated exclusively for your VARON AI account<br />
        • No further action is required once verified
      </div>

      <div class="warning">
        <strong>Security Reminder:</strong><br />
        VARON AI will never request your password or OTP via email or chat.
        If you did not initiate this request, you can safely ignore this message.
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-text">
        Automated security message from VARON AI<br />
        Please do not reply to this email
      </div>

      <div class="system">
        <div>
          <span>Timestamp</span>
          <strong>${new Date().toLocaleString()}</strong>
        </div>
        <div>
          <span>Encryption</span>
          <strong>AES-256</strong>
        </div>
        <div>
          <span>System</span>
          <strong>VARON AI Core</strong>
        </div>
        <div>
          <span>Request IP</span>
          <strong>Protected</strong>
        </div>
        <br/>
        <span class="log-entry" style="text-align: center; color: #3f3f46;">© ${new Date().getFullYear()} VARON AI Inc. All systems nominal.</span>
      </div>
      </div>
    </div>
  </div>
</body>
</html>
`,
    });

    return res.status(201).json({
      message: "Verify Your Email via OTP. To Register.",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const VerifyUser = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (typeof email !== "string" || typeof otp !== "string") {
      return res.status(406).json({
        error: "Invalid request data. Please Only String Data is allowed!",
      });
    }

    const ifUserExists = await UserModel.findOne({ email });

    if (ifUserExists) {
      return res.status(400).json({
        error: "User Already Exists. Login Instead !",
      });
    }

    const User = await VerifyUserOtp({ email, otp });

    if (!User) {
      return res.status(404).json({
        error: "Could Not Verify User. Please Try Again !",
      });
    }

    const token = User.JwtGenToken();

    res.cookie("token_id_user", token, {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      samesite: "none",
      secure: true,
    });

    return res.status(200).json({
      message: "Account Verified & Created Successfully.",
      token,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      error: error.message,
    });
  }
};

export const ResendUserOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (typeof email !== "string") {
      return res.status(406).json({
        error: "Invalid request data. Please Only String Data is allowed!",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const info = transporter.sendMail({
      from: "VARON AI <endgamingai2@gmail.com>",
      to: email,
      subject: "🔐 VARON AI – Verify Your Identity",
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>VARON AI – Verification</title>

<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

body {
  margin: 0;
  padding: 0;
  background: #f9fafb;
  font-family: 'JetBrains Mono', monospace;
  color: #0f172a;
}

.wrapper {
  max-width: 620px;
  margin: 40px auto;
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 25px 70px rgba(16, 185, 129, 0.18);
  border: 1px solid #e5e7eb;
}

/* Header */
.header {
  padding: 42px 32px;
  text-align: center;
  background: linear-gradient(135deg, #10b981, #14b8a6);
  color: white;
}

.logo {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 3px;
}

.tagline {
  margin-top: 8px;
  font-size: 14px;
  letter-spacing: 3px;
  opacity: 0.9;
  text-transform: uppercase;
}

/* Body */
.content {
  padding: 42px 36px;
}

.title {
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 12px;
}

.subtitle {
  text-align: center;
  font-size: 15px;
  color: #475569;
  line-height: 1.8;
  margin-bottom: 36px;
}

/* OTP Card */
.otp-card {
  background: linear-gradient(135deg, #ecfdf5, #f0fdfa);
  border: 1px solid #a7f3d0;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  margin-bottom: 36px;
}

.otp-label {
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #047857;
  margin-bottom: 14px;
}

.otp {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 14px;
  color: #065f46;
}

/* Info */
.info {
  font-size: 14px;
  color: #334155;
  line-height: 1.9;
  margin-bottom: 30px;
}

.info strong {
  color: #059669;
}

/* Warning */
.warning {
  background: #fff1f2;
  border: 1px solid #fecdd3;
  border-radius: 14px;
  padding: 20px;
  font-size: 14px;
  color: #7f1d1d;
  line-height: 1.8;
}

/* Footer */
.footer {
  background: #f0fdf4;
  padding: 26px 30px;
  border-top: 1px solid #d1fae5;
  text-align: center;
}

.footer-text {
  font-size: 12px;
  color: #475569;
  margin-bottom: 18px;
}

.system {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  font-size: 12px;
}

.system div span {
  display: block;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #059669;
  margin-bottom: 4px;
}

.system div strong {
  color: #0f172a;
}

@media (max-width: 600px) {
  .otp {
    font-size: 36px;
    letter-spacing: 10px;
  }
  .system {
    grid-template-columns: 1fr;
  }
}
</style>
</head>

<body>
  <div class="wrapper">

    <!-- Header -->
    <div class="header">
      <div class="logo">VARON AI</div>
      <div class="tagline">Command • Delegate • Execute</div>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="title">Verify Your Identity</div>
      <div class="subtitle">
        To continue accessing your intelligent AI command system,
        please confirm your identity using the verification code below.
      </div>

      <!-- OTP -->
      <div class="otp-card">
        <div class="otp-label">Your Verification Code</div>
        <div class="otp">${otp}</div>
      </div>

      <div class="info">
        • This code is valid for <strong>5 minutes</strong><br />
        • Generated exclusively for your VARON AI account<br />
        • No further action is required once verified
      </div>

      <div class="warning">
        <strong>Security Reminder:</strong><br />
        VARON AI will never request your password or OTP via email or chat.
        If you did not initiate this request, you can safely ignore this message.
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-text">
        Automated security message from VARON AI<br />
        Please do not reply to this email
      </div>

      <div class="system">
        <div>
          <span>Timestamp</span>
          <strong>${new Date().toLocaleString()}</strong>
        </div>
        <div>
          <span>Encryption</span>
          <strong>AES-256</strong>
        </div>
        <div>
          <span>System</span>
          <strong>VARON AI Core</strong>
        </div>
        <div>
          <span>Request IP</span>
          <strong>Protected</strong>
        </div>
        <br/>
        <span class="log-entry" style="text-align: center; color: #3f3f46;">© ${new Date().getFullYear()} VARON AI Inc. All systems nominal.</span>
      </div>
      </div>
    </div>
  </div>
</body>
</html>
`,
    });

    const ResendOtp = await ResendUserOtplogic({ email, otp });

    if (!ResendOtp) {
      return res.status(404).json({
        error: "Could Not Resend OTP. Please Try Again !",
      });
    }

    return res.status(200).json({
      message: `New OTP Resent Successfully. to Your Email. ${email.slice(
        0,
        6
      )}****${email.slice(-4)}`,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(406).json({
        error: "Invalid request data. Please Only String Data is allowed!",
      });
    }

    const User = await LoginUserCheck({ email, password });

    if (!User) {
      return res.status(404).json({
        error: "Could Not Login User. Please Try Again !",
      });
    }

    const token = User.JwtGenToken();

    res.cookie("token_id_user", token, {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      samesite: "none",
      secure: true,
    });

    return res.status(200).json({
      message: "Login Successful.",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("token_id_user");

    return res.status(200).json({
      message: "Logout Successful.",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const GetUser = async (req, res) => {
  try {
    const UserId = req.user.id;

    const User = await UserModel.findById(UserId);

    if (!User) {
      return res.status(404).json({
        error: "User Not Found.",
      });
    }

    return res.status(200).json({
      user: User,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const RegisterAndLoginUsingGoogle = async (req, res) => {
  try {
    const user = req.user;
    const token = user.JwtGenToken();

    const nextJsApiUrl = `${process.env.CLIENT_SIDE_URL}/api/auth`;

    return res.redirect(`${nextJsApiUrl}?token=${token}`);
  } catch (error) {
    return res.redirect(
      `${process.env.CLIENT_SIDE_URL}/login?error=AuthFailed`
    );
  }
};
