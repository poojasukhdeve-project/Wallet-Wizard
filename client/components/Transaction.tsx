import Link from "next/link";

export default function Transaction({ transaction, index }: any) {
  return (
    <tr>

      <td>{index + 1}</td>

      <td>
        <Link href={`/transaction/${transaction.id}`}>
          {transaction.name}
        </Link>
      </td>

      {/* ✅ FIX CATEGORY */}
      <td>
        {transaction.category?.name || "N/A"}
      </td>

      {/* ✅ FORMAT DATE */}
      <td>
        {new Date(transaction.date).toLocaleDateString()}
      </td>

      {/* ✅ FORMAT AMOUNT */}
      <td>
        ${Number(transaction.amount).toFixed(2)}
      </td>

      {/* ✅ FORMAT CREATED AT */}
      <td>
        {new Date(transaction.created_at).toLocaleString()}
      </td>

    </tr>
  );
}