interface FormatMessageTimeOptions {
  hour: "2-digit";
  minute: "2-digit";
  hour12: boolean;
}

function formatMessageTime(date: string | number | Date): string {
  const options: FormatMessageTimeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Date(date).toLocaleTimeString("en-US", options);
}

export default formatMessageTime