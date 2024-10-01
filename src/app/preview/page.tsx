"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Recipient {
  Name: string;
  Email: string;
}

const PreviewPage = () => {
  const router = useRouter();
  const [emailData, setEmailData] = useState<{
    template: string | null;
    subject: string;
    content: string;
    recipients: Recipient[];
  } | null>(null);

  useEffect(() => {
    // Retrieve the data passed through router or manage state
    const data = localStorage.getItem("emailData"); // Assuming data is saved in localStorage
    if (data) {
      setEmailData(JSON.parse(data));
    } else {
      router.push("/"); // Redirect to form if no data is found
    }
  }, [router]);

  if (!emailData) return <p>Loading...</p>;

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        className="text-5xl font-extrabold text-white mb-12"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Preview Your Newsletter
      </motion.h1>

      <motion.div
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Template:</h2>
          <p className="text-gray-700">{emailData.template}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Subject:</h2>
          <p className="text-gray-700">{emailData.subject}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Content:</h2>
          <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: emailData.content }} />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Recipients:</h2>
          <ul className="list-disc list-inside text-gray-700">
            {emailData.recipients.map((recipient, index) => (
              <li key={index}>
                {recipient.Name} - {recipient.Email}
              </li>
            ))}
          </ul>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#6366f1" }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-md w-full font-semibold tracking-wide mt-6"
          onClick={() => {
            // Handle the action, like sending the emails
            alert('Emails would be sent now!');
          }}
        >
          Send Emails
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default PreviewPage;
