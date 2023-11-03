const Donations = () => {
  return (
    <div>
      {" "}
      {donations.map(() => {
        return (
          <div key={donation.id} className="p-4 shadow mb-2">
            {donations.fields.name} donated ${donation.fields.amount} <br />{" "}
            {donation.fields.message}
          </div>
        );
      })}
    </div>
  );
};

export default Donations;
