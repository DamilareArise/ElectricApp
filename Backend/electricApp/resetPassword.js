let resetPasswordMailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 2px solid #eaeaea;
        }
        .header h1 {
            margin: 0;
            color: #eda145;
        }
        .content {
            padding: 20px;
        }
        .content p {
            line-height: 1.6;
        }
        .content a {
            display: inline-block;
            background-color: #eda145;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            border-top: 2px solid #eaeaea;
            margin-top: 20px;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Reset Your Password</h1>
        </div>
        <div class="content">
            <p>Dear [User's Name],</p>
            <p>We received a request to reset your password for your account. Click the button below to reset your password:</p>
            <p><a href="[Reset Link]" target="_blank">Reset Password</a></p>
            <p>If you did not request this password reset, please ignore this email or contact our support team if you have any concerns.</p>
            <p>This password reset link will expire in 1 hour.</p>
            <p>Best regards,<br>The ElectricityApp Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 ElectricityApp. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = resetPasswordMailHTML;
