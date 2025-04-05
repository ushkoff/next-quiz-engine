interface ErrorScreenProps {
  message: string;
}

export default function ErrorScreen({ message }: ErrorScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-red-600">{message}</div>
    </div>
  );
}
