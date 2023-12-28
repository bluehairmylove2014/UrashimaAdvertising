import CustomImage from '@presentational/atoms/CustomImage';
import LoginForm from '@presentational/molecules/LoginForm';

export default function Auth() {
  return (
    <div className="container mx-auto max-w-xl relative z-20">
      <div className="grid grid-cols-5 grid-rows-1 gap-2 w-full h-fit bg-white overflow-hidden rounded">
        <div className="col-span-2">
          <CustomImage
            src="/assets/images/graphics/advertising-board.png"
            alt="advertising board"
            width="100%"
            height="100%"
            // blurDataURL=""
            // placeholder="blur"
            isPriority={true}
          ></CustomImage>
        </div>
        <div className="col-span-3">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
