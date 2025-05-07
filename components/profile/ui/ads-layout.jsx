export function AdsLayout({ createNewAddButton, ads }) {
  return (
    <div className="space-y-12">
      {createNewAddButton}
      {ads}
    </div>
  );
}
