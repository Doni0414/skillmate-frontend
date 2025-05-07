export function PublicationHeaderLayout({ profileImage, name, country, city }) {
  return (
    <div className="flex gap-3">
      {profileImage}
      <div>
        <div className="font-bold text-[14px]">{name}</div>
        <div className="text-[#878D98] font-bold text-[12px]">
          {country}
          {city ? ", " + city : ""}
        </div>
      </div>
    </div>
  );
}
