export default function AddressInputs({ addressProps, setAddressProps, disapled = false }) {
  const { phone, address, postal, city, country } = addressProps;
  return (
    <div className="flex flex-col gap-2">
      <input
        type="tel"
        disabled={disapled}
        placeholder="Phone number"
        value={phone || ''}
        onChange={(evt) => setAddressProps('phone', evt.target.value)}
      />
      <input
        type="text"
        disabled={disapled}
        placeholder="Street address"
        value={address || ''}
        onChange={(evt) => setAddressProps('address', evt.target.value)}
      />
      <div className="flex gap-2">
        <input
          type="text"
          disabled={disapled}
          placeholder="Postal code"
          value={postal || ''}
          onChange={(evt) => setAddressProps('postal', evt.target.value)}
        />
        <input
          type="text"
          disabled={disapled}
          placeholder="City"
          value={city || ''}
          onChange={(evt) => setAddressProps('city', evt.target.value)}
        />
      </div>
      <input
        type="text"
        disabled={disapled}
        placeholder="Country"
        value={country || ''}
        onChange={(evt) => setAddressProps('country', evt.target.value)}
      />
    </div>
  );
}
