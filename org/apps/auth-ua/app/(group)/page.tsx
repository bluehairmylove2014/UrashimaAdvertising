import CustomImage from '@presentational/src/atoms/CustomImage';
import LoginForm from '@presentational/src/molecules/LoginForm';

export default function Auth() {
  return (
    <main className="w-screen h-screen bg-[url('/assets/images/bgs/dark-bg.png')] bg-cover bg-no-repeat grid place-items-center">
      <div className="container mx-auto max-w-3xl">
        <div className="grid grid-cols-2 grid-rows-1 gap-2 w-full h-fit bg-white overflow-hidden rounded">
          <CustomImage
            src="/assets/images/graphics/advertising-board.png"
            alt="advertising board"
            width="100%"
            height="100%"
            externalClassName="col-start-1"
            // blurDataURL=""
            // placeholder="blur"
            isPriority={true}
          ></CustomImage>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}