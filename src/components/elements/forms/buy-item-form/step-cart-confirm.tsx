import { PurchaseDetails } from ".";

export default function CartConfirmStep({
  purchaseDetails,
  isLoading,
}: {
  purchaseDetails: PurchaseDetails;
  isLoading: boolean;
}) {
  let paymentType;
  let paymentColor;
  switch (purchaseDetails.checkoutMode) {
    case "cheese-checkout":
      paymentType = "$CHEESE";
      paymentColor = "text-brand-yellow";
      break;
    case "supercheese-checkout":
      paymentType = "Super $CHEESE";
      paymentColor = "text-brand-green";
      break;
    case "eth":
      paymentType = "ETH";
      paymentColor = "text-brand-green";
      break;
    default:
      // code block
      paymentType = "Unknown";
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold">Purchase Details</h2>
      <div className="divide-y divide-border-gray">
        <div className="flex py-2 text-sm text-neutral-400">
          Pack type <span className="flex-1 w-fit flex justify-end">Rare</span>
        </div>
        <div className="flex py-2 text-sm text-neutral-400">
          Quantity{" "}
          <span className="flex-1 w-fit flex justify-end">
            {purchaseDetails.amount}
          </span>
        </div>
        <div className="flex py-2 text-sm text-neutral-400">
          Payment type{" "}
          <span className={`flex-1 w-fit flex justify-end ${paymentColor}`}>
            {paymentType}
          </span>
        </div>
        <div className="flex py-2 text-sm text-neutral-400">
          Total{" "}
          <span className="flex-1 w-fit flex justify-end">
            {purchaseDetails.totalPrice.toLocaleString("en-US")}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button
          type="submit"
          className="w-full text-center p-3 font-bold rounded-xl bg-brand-yellow/20 border-2 border-brand-yellow/50 text-brand-yellow hover:bg-brand-yellow/30 transition-all duration-200"
        >
          {isLoading ? "Processing" : "Confirm Purchase"}
        </button>
        <button
          type="reset"
          className="w-full text-center p-3 font-bold rounded-xl bg-neutral-950 border-2 border-neutral-900 hover:bg-neutral-900 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
