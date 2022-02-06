function CandidateCardModalHeader({ candidate, showClose = true }) {
  return (
    <div
      style={{ backgroundColor: candidate.party.color }}
      className="relative"
    >
      {showClose && (
        <button className="absolute top-3 right-3" datadismiss="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
            <path
              d="M12.519 14-.003 1.478 1.475 0l12.522 12.522Z"
              fill="#000000"
            />
            <path d="M14 1.478 1.478 14 0 12.522 12.522 0Z" fill="#000000" />
          </svg>
        </button>
      )}
      <div className="flex items-center px-6 py-5 space-x-4">
        <div className="font-martin uppercase text-center text-xl text-black flex-shrink-0">
          {candidate.electoralNumber && (
            <p>#Tarjetón: {candidate.electoralNumber}</p>
          )}
          <img
            src={candidate.photo}
            alt={candidate.fullname}
            className="max-w-full w-28"
          />
        </div>
        <div className="">
          <p className="text-sm">Pendiente</p>
          <p className="text-sm">{candidate.party.label}</p>
          <p className="text-lg leading-tight">{candidate.fullname}</p>
          {candidate.twitterHandle && (
            <a
              href={`https://twitter.com/${candidate.twitterHandle}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block"
            >
              <img src="/twitter.svg" alt="" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default CandidateCardModalHeader;
