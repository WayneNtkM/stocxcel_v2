import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { BsFillCalculatorFill, BsSearch } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import Loading from '~/components/Loading';
import useDataFetcher from '~/hooks/useDataFetcher';
import { api } from '~/utils/api';
import { type IUserSession } from '~/utils/types/userTypes';

export default function Profile() {
  const { push } = useRouter();
  // const { data } = useSession() as unknown as IUserSession;
  // const { data: user } = api.user.login.useMutation();
  const data = useDataFetcher();

  console.log(data)

  useEffect(() => {
    if (!data) {
      void push("/")
    }
  });

  if (!data) return <Loading />;

  if (data.user) {
    return (
      <div>
        <Header />
        <div className='flex flex-col items-center p-8'>
          <div className='flex gap-4 w-[100%] justify-start items-center'>
            <Image
              src={data.user.image}
              alt={data.user.name}
              width={50}
              height={50}
              priority={true}
              className='rounded-[100%] h-[50px]'
            />
            <span className='text-[28px] font-[600]'>{data.user.name}</span>
            <button type="button" onClick={() => { 
              void signOut()
              void push("/")
            }}>
              Sair
            </button>
          </div>
          <hr className='w-[100%] my-8 bg-black' />
          <div className='flex flex-col gap-4 w-[100%]'>
            <p className='font-[600] text-[18px]'>Acesso rápido</p>
            <div className='flex gap-2'>
              {[
                ['Consulta', '/stocks', <BsSearch key={1} />],
                ['Calculadora', '/simulate', <BsFillCalculatorFill key={2} />],
                ['Dados cadastrais', '/user/info', <CgProfile key={3} />],
              ].map(([type, route, icon], i) => {
                return (
                <Link
                  className='w-[40%] h-[80px] bg-[#262525] text-white border border-[#007aff] p-2 rounded'
                  href={route as string}
                  key={i}
                >
                  <div className='flex flex-col justify-around w-[100%] h-[100%]'>
                    {icon}
                    <span
                      className='text-[14px] font-[600] leading-3'
                    >
                      {type}
                    </span>
                  </div>
                </Link>
                )
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

// export async function getServerSideProps(context: NextPageContext) {
//   const { req, pathname } = context;
//   const cookies = req?.headers.cookie as string;
//   const parsedCookies = parse(cookies);
//   if (!parsedCookies['access_token'] && pathname !== '/auth/singin') {
//     return { redirect: { destination: '/auth/signin' } }
//   }
//   return { props: { cookies: parsedCookies['access_token'] } }
// }
