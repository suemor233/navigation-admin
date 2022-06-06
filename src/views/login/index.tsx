import {LoginBg} from '@/components/Login/bg';
import {LoginForm} from '@/components/Login/form';
import { useMessage } from 'naive-ui';
import { defineComponent } from 'vue'

export const LoginPage = defineComponent({
  setup(props, ctx) {

  return () => (
      <>
      <div class={'h-screen flex'}>
        <LoginBg/>
        <LoginForm/>
      </div>
      </>
    );
  }
})