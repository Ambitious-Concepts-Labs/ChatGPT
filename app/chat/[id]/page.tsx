import { Chat, ChatInput } from "../(components)/components";
interface Props {
  params: {
    id: string;
  };
}

function Chatpage({ params: { id } }: Props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Main Chat section */}
      <Chat chatId={id} />

      {/* Chat input field */}
      <ChatInput chatId={id} />
    </div>
  );
}

export default Chatpage;
