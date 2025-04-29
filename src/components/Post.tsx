import likeSvg from "../assets/like-svgrepo-com.svg";
import dislikeSvg from "../assets/dislike-svgrepo-com.svg";
import { useAppDispatch } from "../service/hooks";
import { addLike, deleteLike } from "../service/postSlice";
import { Link } from "react-router-dom";

export type TPropsPost = {
  body: string;
  id: number;
  title: string;
  like: number;
  dislike: number;
  index: number;
};

export const Post = (props: TPropsPost) => {
  const { title, body, like, dislike, id, index } = props;
  const dispatch = useAppDispatch();
  const width = index === 0 ? 'w-5xl' : 'w-lg'

  return (
    <article className={`${width} flex flex-col gap-4`}>
      <img
        src="https://rgo.ru/upload/s34web.imageadapter/5c5fa73cba8268fce844e7a9617139dc/anna_politova_solnechnyy_ushishir_602387.jpg"
        alt="Image"
      />
      <div className="flex justify-between">
        <h2 className="text-left">{title}</h2>
        <div className="flex gap-8 items-start">
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
      <p className="text-left">{body}</p>
      <Link
        to={{ pathname: `/posts/${id}` }}
        className="p-4 border rounded-4xl self-end"
      >
        Читать далее
      </Link>
    </article>
  );
};
