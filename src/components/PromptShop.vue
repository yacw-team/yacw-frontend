<template>
    <div class="mask" v-show="isVisible" @click="isVisible = false"></div>
    <div style="width: 100%;">
    <el-row class="all">
        <el-col :span="2" class="MyMenu">
            <el-menu default-active="2" class="el-menu-vertical-demo">
                <el-menu-item index="All" @click="changeType('All')">
                    <span>All</span>
                </el-menu-item>
                <el-menu-item index="Ads" @click="changeType('Ads')">
                    <span>Ads</span>
                </el-menu-item>
                <el-menu-item index="Business" @click="changeType('Business')">
                    <span>Business</span>
                </el-menu-item>
                <el-menu-item index="Chatbot" @click="changeType('Chatbot')">
                    <span>Chatbot</span>
                </el-menu-item>
                <el-menu-item index="Coach" @click="changeType('Coach')">
                    <span>Coach</span>
                </el-menu-item>
                <el-menu-item index="Code" @click="changeType('Code')">
                    <span>Code</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="22">
            <div class="allElement">
                <el-row :gutter="20" v-for="row in cardColumns" justify-content="space-between">
                    <el-col v-for="col in row" :span="8">
                        <el-card :body-style="{ padding: '0px' }" @click="sendMessage(col)">
                            <div class="background" :style="{ background: col.background }">
                                <span class="emoji">{{ col.icon }}</span>
                                <span class="name">{{ col.name }}</span>
                            </div>
                            <div class="bottom" style="padding: 14px">
                                <span>{{ col.name }}</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>


        </el-col>
    </el-row>
    <teleport to=".mask">
        <Details :jsondataicon="jsondata.icon" :jsondataprompts="jsondata.prompts"  
        :jsondatabackground="jsondata.background" :jsondataname="jsondata.name" 
        :jsondatadescription="jsondata.description" 
        v-if="isVisible" @close="isVisible = false" v-model="isVisible"
            @usePrompt="(msg: string) => finishChoosePrompt(msg)" />
    </teleport>
    <div class="footer">
        <el-pagination background layout="prev, pager, next" :total="PromptsList.Prompts.length" :current-page="currentPage"
            :page-size="12" @current-change="updatePage" />
    </div></div>
</template>
  
<script setup lang="ts">
import { reactive, onMounted, computed, ref, watch } from 'vue'
import Details from '@/components/LookDetailsPrompt.vue'

import axios from 'axios'


interface Prompt {
    id: string,
    name: string,
    description: string,
    prompts: string,
    background: string,
    icon: string
};
const PromptsList = reactive({
    Prompts: [] as Prompt[],
})





//发送到详情页面的信息
const jsondata = reactive<Prompt>({
    id: '',
    name: '',
    description: '',
    prompts: '',
    background: '',
    icon: ''
});


const currentPage = ref(1);
const isVisible = ref(false);
const pageSize = 12;
const promptType = ref();
const emit = defineEmits(['sendPrompt', 'changeShow1']);
const promptMessage = ref();  //传递给输入框的prompt信息，来自LookDetailsPrompt

//事件方法的集合

function changeType(index: string) {
    if(index!='All')
    promptType.value = index;
    else  promptType.value = null;
    fetchCards(promptType.value);
    console.log(index);
}

//更新当前页面值，并刷新页面
function updatePage(page: number) {
    currentPage.value = page;
    cardColumns;
}


function sendMessage(col: Prompt) {
    jsondata.id = col.id;
    jsondata.background = col.background;
    jsondata.name = col.name;
    jsondata.description = col.description;
    jsondata.icon = col.icon;
    jsondata.prompts = col.prompts;
    isVisible.value = true;
}

//选择好prompt后，接收到，此时可以回传
function finishChoosePrompt(msg: string) {
    emit('sendPrompt', msg);
    emit('changeShow1', false)
}

// 随机生成渐变颜色和 emoji
const getRandomBackground = () => {
    const randomColor1 = Math.floor(Math.random() * 255);
    const randomColor2 = Math.floor(Math.random() * 255);
    const randomColor3 = Math.floor(Math.random() * 255);
    const background = `linear-gradient(to bottom right, rgb(${randomColor1}, ${randomColor2}, ${randomColor3}), rgb(${randomColor2}, ${randomColor3}, ${randomColor1}))`;
    const icons = ["🐨", "🐘", "🐇", "🐻‍❄️", "🦥", "🦛", "🍔", "🍟", "🍕", "🍩", "🍦", "🥨", "🍺", "🍷", "🍸", "🐶", "🦁", "🐯", "🐻", "🐮", "🐷", "🐰", "🐥", "🦆", "🌲", "🌳", "🌴"];
    const icon = icons[Math.floor(Math.random() * icons.length)];
    return { background, icon };
};

const data = ref({ Prompts: [] as Prompt[] });
const fetchCards = async (index: string) => {
    //根据类型进行请求
    let url = '/api/v1/chat/prompts';
    if (index != null) {
        url += `?type=${index}`;
    }

    // try {
    //     console.log("发出请求，来获得shop资源");
    //     const res = await fetch(url);
    //     data.value = await axios.get(url);


    // } catch (error) {
    //     console.log("获取失败,使用默认值")
    //     data.value = {
    //         Prompts: [
    //             {
    //                 'id': '1',
    //                 "name": "111",
    //                 "description": "string",
    //                 "prompts": "string",
    //                 "icon": '',
    //                 "background": ''
    //             },
    //             {
    //                 'id': '2',
    //                 "name": "222",
    //                 "description": "大便啊",
    //                 "prompts": "大便啊",
    //                 "icon": '',
    //                 "background": ''
    //             },
    //             {
    //                 'id': '3',
    //                 "name": "333",
    //                 "description": "我靠",
    //                 "prompts": "我靠",
    //                 "icon": '',
    //                 "background": ''
    //             },
    //         ]
    //     };

    // }
    axios.get(url).then(response => {
        console.log("发出请求,来获得shop资源");
         data.value = response.data;
        PromptsList.Prompts = data.value.Prompts.map((prompt: Prompt) => {
            const { background, icon } = getRandomBackground();
            console.log(data)
            return { ...prompt, background, icon };
        })
    },error=>{
        console.log("获取失败,使用默认值")
        data.value = {
            Prompts: [
                {
                    'id': '1',
                    "name": "111",
                    "description": "string",
                    "prompts": "string",
                    "icon": '',
                    "background": ''
                },
                {
                    'id': '2',
                    "name": "222",
                    "description": "大便啊",
                    "prompts": "大便啊",
                    "icon": '',
                    "background": ''
                },
                {
                    'id': '3',
                    "name": "333",
                    "description": "我靠",
                    "prompts": "我靠",
                    "icon": '',
                    "background": ''
                },
            ]
        };
    })
}


onMounted(() => {
    console.log("shop的Mount时刻");
    fetchCards(promptType.value);
    console.log("此时已经获取资源")
});

const cardColumns = computed(() => {


    //这部分负责把json数据塞入二维数组[][]
    const columns = [];
    let column = [];

    //这部分负责计算页数来更新数据

    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    PromptsList.Prompts = data.value.Prompts.map((prompt: Prompt) => {
        const { background, icon } = getRandomBackground();
        return { ...prompt, background, icon };
    });

    for (let i = start; i < PromptsList.Prompts.length && i < end; i++) {
        column.push(PromptsList.Prompts[i]);

        if ((i + 1) % 3 === 0 || i === PromptsList.Prompts.length - 1) {
            columns.push(column);
            column = [];
        }
    }


    return columns;
});

watch(() => data, (newVal) => {
    PromptsList.Prompts = data.value.Prompts.map((prompt: Prompt) => {
        const { background, icon } = getRandomBackground();
        return { ...prompt, background, icon };
    });
})


</script>
  
<style>
.el-row {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}



.el-col {
    border-radius: 4px;
    width: 30%;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.el-card .background {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
}

.el-card .emoji {
    font-size: 48px;
}

.el-pagination {
    position: absolute;
    /* 设置按钮为绝对定位，相对于容器进行定位 */
    bottom: 0;
    /* 距离容器底部为0 */
}

.allElement {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 5%;
}

.el-menu {
    width: fit-content;

}

.footer {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: flex-end;
    /* 垂直居底 */
    position: relative;
    /* 设置容器为相对定位 */
    right: 0;
    bottom: 0;

}

.MyMenu {
    height: 100vh;
    padding-right: 5%;
   
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}


div {
    position: relative;
}

.emoji {
    filter: blur(1px);
}

.name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: aliceblue;
}
</style>