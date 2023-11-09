import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { scrapeTranscriptions } from "@/utils/scrapeTranscriptionsFromURL";

interface ModalProps {
  toggleModal: (event: React.MouseEvent) => void;
}

enum ButtonVariant {
  Link = "link",
  Default = "default",
  // Add other variants as needed
}

export default function Modal({ toggleModal }: ModalProps) {
  const [lectureUrl, setLectureUrl] = useState("");
  const [isTranscriptLoading, setIsTranscriptLoading] = useState(false);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLectureUrl(event.target.value);
  }

  async function handleClick(event: React.MouseEvent) {
    if (lectureUrl !== "") {
      try {
        setIsTranscriptLoading(true);
        const transcripts = await scrapeTranscriptions(lectureUrl);
        console.log(transcripts);
      } catch (error) {
        console.log("Couldn't get transcripts");
      } finally {
        setIsTranscriptLoading(false);
      }
    }
    toggleModal(event);
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      id="new-chat-modal"
      role="dialog"
    >
      <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 w-80">
        <h3 className="text-xl font-semibold mb-4">New Chat</h3>
        <form>
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="lecture-url"
          >
            Lecture URL:
          </label>
          <Input
            className="mb-4"
            id="lecture-url"
            placeholder="Enter the lecture URL..."
            value={lectureUrl}
            onChange={handleInputChange}
          />
          {isTranscriptLoading ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              This may take a minute
            </Button>
          ) : (
            <Button
              className="w-full"
              type="submit"
              variant="default"
              onClick={handleClick}
            >
              Create
            </Button>
          )}
          {/* <Button disabled className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button> */}
        </form>
      </div>
    </div>
  );
}
