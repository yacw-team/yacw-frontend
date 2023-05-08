import { reactive } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';


  
  interface State {
  apiKey: string |123;
}

export const useStore = () => {
  const state = reactive<State>({
    apiKey: localStorage.getItem('apiKey') || 123,
  });

  const setApiKey = async (apiKey: string) => {
    try{
        const response = await axios.post(`/v1/chat/apikey`,{apiKey});
        state.apiKey = apiKey;
        localStorage.setItem('apiKey',apiKey);
        if(response.status === 200){
        ElMessage({
          type: 'success',
          message: 'API key has been set successfully',
        });
    }
  }
    
    catch(error)
    {
      ElMessage(
        {
          type:'error',
          message:'Unable to set API key',
        }
      )
    }
  };

  return { state, setApiKey };
};

