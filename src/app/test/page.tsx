"use client";

export default function Page() {
  //   const fakeUpgrade = async () => {
  //     const body = {
  //       event: {
  //         data: {
  //           block: {
  //             logs: [
  //               {
  //                 topics: [
  //                   "0x0c3fdcacbee530581c67c89a851ff8052aa367c589919df3056398ce311a237d",
  //                 ],
  //                 transaction: {
  //                   from: {
  //                     address: "0x97a3db86574a8ab10a8c141f3f6b7dc34cb3ade5",
  //                   },
  //                 },
  //               },
  //             ],
  //           },
  //         },
  //       },
  //     };

  //     await fetch("/api/webhooks/upgrade", {
  //       method: "POST",
  //       body: JSON.stringify(body),
  //     });
  //   };

  return (
    <div className="p-6">
      <h1 className="mb-4">Test fake upgrade</h1>
      <div>
        <button
          onClick={() => alert("Nada aqui")}
          className="p-3 rounded-lg bg-brand-yellow text-yellow-950 font-bold"
        >
          Fake upgrade
        </button>
      </div>
    </div>
  );
}
