import {LoginBg} from '@/views/login/bg';
import {LoginForm} from '@/views/login/form';
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