exports.createEmailTemplate = ({ userFirst, userSecondName, orderNumber,totalAmount ,products}) => `

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            text-align: center;
            padding: 25px 0;
            background-color: #28a745;
            color: white;
            border-radius: 12px 12px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 22px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .order-details {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            text-align: left;
        }
        .order-details p {
            margin: 8px 0;
            font-size: 14px;
        }
        .cta-button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 18px;
            background: #28a745;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            padding: 15px;
            font-size: 12px;
            color: #777;
            background: #f9f9f9;
            border-radius: 0 0 12px 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Thank You for Your Order! 🎉</h1>
        </div>
        <div class="content">
            <p>Hi <strong>${userFirst} ${userSecondName}</strong>,</p>
            <p>We are thrilled to have you as our customer! Here are your order details:</p>
            <div class="order-details">
                <p><strong>Order Number:</strong> ${orderNumber}</p>
               <p><strong>Items:</strong></p>
                <ul>
                    ${products.map(product => `<li>${product.name} x ${product.numOfProducts} - ₦${product.price}</li>`).join('')}
                </ul>
                <p><strong>Total:</strong> ₦${totalAmount}</p>
            </div>
          
            <p>If you have any questions, feel free to <a href="#" style="color: #28a745; text-decoration: none; font-weight: bold;">contact us</a>.</p>
        </div>
        
        <div class="footer">
            <p>&copy; 2025 ShopCart. All Rights Reserved.</p>
        </div>
    </div>
</body>
</html>
`;
