import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../types/user"
import './userCard.scss';

type UserCardProps = {
  user: User;
}
function UserCard({ user }: UserCardProps) {
  //сохраненные лайки идентифицируются по айди юзера
  const storedLike = localStorage.getItem(`like_${user.id}`);
  const [like, setLike] = useState<boolean>(!!storedLike);

  function handleClick() {
    const toggle = !like;
    setLike(toggle);
    if (toggle) {
      localStorage.setItem(`like_${user.id}`, '1')
    } else {
      localStorage.removeItem(`like_${user.id}`);
    }

  }

  return (
    <div className="card__container">
      <Link to={`/${user.id}`} className="card__link">
        <img
          width={124}
          height={124}
          src={user.avatar}
          alt='аватар'
          className="card__img"
        />
        <p className="card__name">{user.first_name} {user.last_name}</p>
      </Link>
      <div className="card__icon_wrap">
        <div className="card__icon" onClick={handleClick}>
          <svg width="16" height="14" viewBox="0 0 16 14" fill={like? "#512689" : "none"} xmlns="http://www.w3.org/2000/svg">
            <path d="M4.85 1C2.72375 1 1 2.72173 1 4.84548C1 8.69096 5.55 12.1869 8 13C10.45 12.1869 15 8.69096 15 4.84548C15 2.72173 13.2762 1 11.15 1C9.848 1 8.6965 1.64569 8 2.63398C7.64499 2.1289 7.17336 1.71669 6.62504 1.43226C6.07672 1.14784 5.46785 0.999565 4.85 1Z" stroke={like? "#512689" : "#151317"} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default UserCard;