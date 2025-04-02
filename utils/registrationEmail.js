exports.createEmailTemplate = ({ userfirstName, userlastName }) => `

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Store</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            background: green;
            color: #ffffff;
            padding: 15px;
            font-size: 20px;
            font-weight: bold;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333333;
        }
        .button {
            display: inline-block;
            background: green;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Welcome to ShopCart!</div>
        <div class="content">
            <p>Hello <strong>${userfirstName}-${userlastName}</strong>,</p>
            <p>Thank you for signing up at our store. We’re excited to have you join our community of shoe lovers!</p>
          
            <p>If you didn’t create an account, you can ignore this email.</p>
        </div>
        <div class="footer">
            &copy; 2025 Shop Cart. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
