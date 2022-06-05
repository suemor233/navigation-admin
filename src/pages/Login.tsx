import {LoginBg} from '@/views/login/bg';
import {LoginForm} from '@/views/login/form';
import { useMessage } from 'naive-ui';
import { defineComponent } from 'vue'
export const LoginPage = defineComponent({
  setup(props, ctx) {
  window.$message = useMessage()

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