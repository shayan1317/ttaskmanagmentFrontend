type Props = React.PropsWithChildren<{}>;
const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen overflow-auto px-12 pt-8 flex justify-between">
      {/* Left Side - Login Form */}
      <div className="w-[60vw] flex flex-col">
        <h1 className="text-[clamp(1.25rem,2.5vw,2.5rem)] font-medium mb-1 text-start">
          Todo
        </h1>
        <div className="flex-1 flex items-center w-full">
          <div className="w-full"> {children}</div>
        </div>
      </div>
      {/* Right Side - Graphic/Chart */}
      <div className="w-[40vw] flex flex-col relative self-center">
        <img
          className="w-64 lg:w-[100%]  shadow-lg shadow-blue-400/150"
          src="https://chatgpt.com/backend-api/public_content/enc/eyJpZCI6Im1fNjg1NmRiOTk0ZjA0ODE5MTgwZDkwMTJjYWJiNzZjNzQ6ZmlsZV8wMDAwMDAwMDI4Mzg2MWY5YjYxOWQ2OTNkZWJkMzFiYSIsInRzIjoiNDg2MjU2IiwicCI6InB5aSIsInNpZyI6IjhkMTA5ZDQ3NjAxOTBjNDc4MGY0MDRjYjJlNDFmMDk3NGNkZmUwZTM5YWJkZWU3MjlhNzNlODcxNmY0OWNlMzMiLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsfQ=="
        />
      </div>
    </div>
  );
};

export default AuthLayout;
