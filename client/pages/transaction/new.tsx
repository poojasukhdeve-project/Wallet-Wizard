import TransactionForm from "@/components/TransactionForm";

export default function NewTransaction() {

  const id = crypto.randomUUID();

  return (

    <div className="flex justify-center pt-10">

      <div className="bg-gray-100 shadow-lg rounded-xl p-6 w-full max-w-md">

        {/* Title */}
      <h1 className="text-xl font-bold mb-4">
        Wallet Wizard Project - February 2026
      </h1>

        <h2 className="text-xl font-bold mb-4 text-center">
          Transaction Page
        </h2>

        <TransactionForm id={id} />

      </div>

    </div>
  );
}