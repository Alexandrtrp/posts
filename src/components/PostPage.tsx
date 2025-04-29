import likeSvg from "../assets/like-svgrepo-com.svg";
import dislikeSvg from "../assets/dislike-svgrepo-com.svg";
import { useAppDispatch } from "../service/hooks";
import { addLike, deleteLike } from "../service/postSlice";
import { Link } from "react-router-dom";
import { TPropsPost } from "./Post";

export const PostPage = (props: TPropsPost) => {
  const { title, body, like, dislike, id, index } = props;
  const dispatch = useAppDispatch();

  return (
    <div className="w-lg flex justify-center m-auto">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <Link to={"/"}>Вернуться к статьям</Link>
          <div className="flex gap-8 ">
            <div className="flex gap-1">
              <img
                className="w-4"
                src={likeSvg}
                onClick={() => dispatch(addLike(id))}
                alt=""
              />
              <span>{like}</span>
            </div>
            <div className="flex gap-1 items-center">
              <img
                className="w-4"
                src={dislikeSvg}
                alt=""
                onClick={() => dispatch(deleteLike(id))}
              />
              <span>{dislike}</span>
            </div>
          </div>
        </div>
        <h2 className="text-center">{title}</h2>
        <img
          src="https://rgo.ru/upload/s34web.imageadapter/5c5fa73cba8268fce844e7a9617139dc/anna_politova_solnechnyy_ushishir_602387.jpg"
          alt="Image"
        />
        <p className="text-left">{body}</p>
      </div>
    </div>
  );
};
