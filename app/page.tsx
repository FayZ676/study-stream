"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pQSDQsBveOn
 */
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal/modal";
import Link from "next/link";
import { useState } from "react";

export default function Component() {
  const [isNewChatButtonClicked, setIsNewChatButtonClicked] = useState(false);

  const handleToggleModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsNewChatButtonClicked(!isNewChatButtonClicked);
  };
  const handleSendChatButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
  };
  return (
    <div className="flex h-screen bg-white dark:bg-zinc-800">
      <aside className="w-80 border-r dark:border-zinc-700 flex flex-col">
        <div className="flex justify-between items-center p-6">
          <h2 className="text-xl font-semibold">Previous Chats</h2>
          <Button
            className="py-1 px-3 text-sm"
            variant="outline"
            onClick={handleToggleModal}
          >
            New Chat
          </Button>
        </div>
        <ul className="overflow-y-auto">
          <li className="border-b dark:border-zinc-700">
            <Link
              className="block p-4 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              href="#"
            >
              Chat 1
            </Link>
          </li>
          <li className="border-b dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-700">
            <Link
              className="block p-4 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              href="#"
            >
              Chat 2
            </Link>
          </li>
          <li className="border-b dark:border-zinc-700">
            <Link
              className="block p-4 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              href="#"
            >
              Chat 3
            </Link>
          </li>
        </ul>
      </aside>
      <section className="flex-1 flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-end space-x-2 mb-4">
            <img
              alt="User avatar"
              className="rounded-full"
              height="40"
              src="/placeholder.svg"
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width="40"
            />
            <div className="bg-blue-500 text-white rounded-lg p-2">
              <p>Hello, how can I help you today?</p>
            </div>
          </div>
          <div className="flex items-end space-x-2 mb-4 ml-auto">
            <div className="bg-gray-300 text-black rounded-lg p-2">
              <p>I need help with my account.</p>
            </div>
            <img
              alt="User avatar"
              className="rounded-full"
              height="40"
              src="/placeholder.svg"
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width="40"
            />
          </div>
        </div>
        <div className="border-t dark:border-zinc-700 p-4">
          <form className="flex space-x-3">
            <textarea
              className="flex-1 resize-none border rounded-md p-2"
              placeholder="Type your message..."
              rows={3}
            />
            <Button type="submit" onClick={handleSendChatButtonClick}>
              Send
            </Button>
          </form>
        </div>
      </section>
      {isNewChatButtonClicked && <Modal toggleModal={handleToggleModal} />}
    </div>
  );
}
