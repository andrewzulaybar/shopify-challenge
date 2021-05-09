import { Skeleton } from 'antd';

interface Props {
  imgUrl: string;
}

export default function MoviePoster(props: Props) {
  return (
    <div className="mb-4">
      {props.imgUrl && props.imgUrl !== 'N/A' ? (
        <img
          src={props.imgUrl}
          className="movie-poster object-cover rounded-lg"
        />
      ) : (
        <Skeleton.Image className="movie-poster rounded-lg" />
      )}
    </div>
  );
}
