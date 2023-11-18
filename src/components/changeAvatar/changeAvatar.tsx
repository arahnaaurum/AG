import { Dispatch, SetStateAction, useState } from "react";
import "../../pages/login/login.scss";
import { patchUser } from "../../features/userAPI";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchUserByIdWithThunk } from "../../store/user/userSlice";

type ChangeAvatarProps = {
  id?: string;
  setUrl: Dispatch<SetStateAction<string>>;
}

function ChangeAvatar({ id, setUrl }: ChangeAvatarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isYourPage = (id === localStorage.getItem('user_id'));
  const [avatar, setAvatar] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);

  //В проекте с реальным API здесь была бы только функция, отправляющая на сервер PATCH запрос
  //Но тестовое API reqres.in не дает реально поменять аватар, поэтому для визуальной демонстрации изменим стейт
  async function handleAvatarChange() {
    setUrl(avatar);
    setAvatar("");
    setShowInput(false);
    if (id) {
      const updatedData = await patchUser("avatar", avatar, +id);
      //обновляем данные юзера
      dispatch(fetchUserByIdWithThunk(+id));
      //в консоль для демонстрации успешного запроса выведен новый url аватара
      console.log(updatedData);
    }
  }

  return (isYourPage ?
    <div>
      <button
        className="form__changebtn"
        onClick={() => setShowInput(!showInput)}
      >
        Поменять аватар?
      </button>
      {showInput &&
        <div className="form__field">
          <div className="form__input_group">
            <input
              type="text"
              name="avatar"
              value={avatar}
              placeholder="URL вида htts://image.com/123"
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
          <button
            className="form__changebtn"
            onClick={handleAvatarChange}
          >
            Меняем!
          </button>
        </div >
      }
    </div>
    : <></>
  )
}

export default ChangeAvatar;