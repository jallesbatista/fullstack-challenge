import LoginForm from "@/components/loginForm";
import { GetServerSideProps, NextPage } from "next";
import nookies from "nookies";

const Login: NextPage<Props> = ({ token }) => {
  return <LoginForm />;
};

interface Props {
  token: boolean;
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const cookies = nookies.get(ctx);
  const token = cookies["kenzie.token"];
  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token: !!token,
    },
  };
};
export default Login;
