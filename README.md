# 📬 Newsletter Generator

Welcome to the **Newsletter Generator**! 🚀 This tool allows you to create, preview, and send personalized newsletters with ease. Built with **React.js**, powered by **Framer Motion** for smooth animations, and enhanced with **CopilotKit** for smart text suggestions.
![image](https://github.com/user-attachments/assets/bfbea335-9034-49f1-9d1f-8472910304b3)
## 🎨 Features

✨ **CSV Upload**: Import your recipient list from a CSV file (Name, Email).  
🎯 **Choose a Template**: Pick from predefined templates to match your email style.  
👀 **Live Email Preview**: Get a real-time preview of your newsletter before sending.  
📧 **Bulk Email Sending**: Send personalized emails to all recipients in one go!  
📝 **Dynamic Content**: Automatically personalize the email for each recipient (e.g., `{{Name}}`).

## 🛠️ Tech Stack

- **Frontend**: React.js, Framer Motion
- **Backend**: Node.js, Next.js API routes
- **Email Service**: Nodemailer for Gmail
- **CSV Parsing**: Papaparse for reading CSV files
- **Smart Text Editing**: CopilotKit for smart textarea suggestions

## 🚀 Getting Started

Follow these steps to set up the project on your local machine.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/newsletter-generator.git
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

### 4️⃣ Run the App

```bash
npm run dev
```

Your app will be live at `http://localhost:3000`! 🎉

## 📂 Folder Structure

```
📁 /components       # Reusable components
📁 /pages/api        # API routes for email sending
📁 /public           # Static assets
📁 /Template         # Email templates
.env.local           # Environment variables
README.md            # You're reading it now!
```

## ✨ How It Works

1. **Upload a CSV File** 📄: The file should include recipient names and emails in this format:
   ```
   Name,Email
   John Doe,john@example.com
   Jane Smith,jane@example.com
   ```

2. **Select a Template** 📑: Choose from the available templates.

3. **Customize Your Content** 📝: Write the email subject and content. You can use placeholders like `{{Name}}` to personalize the email for each recipient.

4. **Preview the Email** 👁️: Before sending, click "Preview Email" to see how it looks.

5. **Send Emails** ✉️: Once satisfied, click "Submit" to send the emails to all recipients.

## 💡 Tips

- Make sure your CSV file is formatted correctly for smooth sending.
- You can customize the templates stored in the `/Template` folder.
- Keep your Gmail credentials safe by using environment variables.

## 🚧 Future Enhancements

- 🔔 Add email scheduling
- 🌐 Integrate other email providers (e.g., SendGrid, Mailchimp)
- 🧩 Template builder for creating custom designs

## 🤝 Contributions

Feel free to open issues or submit pull requests to improve this project. Let's make it better together! 💪

## 🛡️ License

This project is licensed under the MIT License.


