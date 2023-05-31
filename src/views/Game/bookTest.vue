<template>
    <div class="notebook" @getStory="() => ElMessage.info('sss')">
       
        <div class="left-pane">
            <h2>{{ myData.Name }}</h2>
            <p>{{ currentStory.story }}</p>
            <button @click="() => { if (currentStoryIndex >= 1) currentStoryIndex-- }">上一页</button>
        </div>
        <div class="right-pane">
            <div v-if="currentStoryIndex == currentStoryIndex1" class="content" >
               
                <button v-for="(option, index) in currentStory.choice" :key="index" 
                    @click="selectOption(currentStoryIndex + 1, String.fromCharCode(index + 65))">
                    {{ String.fromCharCode(index + 65) }}.{{ option[String.fromCharCode(index + 65)] }}
                </button>
                </div>
    
            <div v-else class="content1">
                <button @click="() => { if (currentStoryIndex < currentStoryIndex1) currentStoryIndex++ }">下一页</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { db } from '@/database/db';
import axios from 'axios';
import { ElMessage, backtopEmits } from 'element-plus';
import { ref, computed, onMounted } from 'vue';

interface choice {
    s: string,
}

interface Story {
    story: string;
    choice: Array<{ [key: string]: string }>;
    round: number;
}


interface selectStory {
    GameId: string,
    Name: string,
    Description: string,
}

const props = defineProps({
    GameId: String,
    Name: String,
    Description: String,
});

const myData = ref<selectStory>({

    GameId: props.GameId as string,
    Name: props.Name as string,
    Description: props.Description as string,
});
const loading=ref(true)
const currentStoryIndex = ref(0);
const currentStoryIndex1 = ref(0);
const apiKey = ref('')
const currentStory = computed(() => stories.value[currentStoryIndex.value]);
const ModelId = ref('')

const stories = ref<Story[]>(
    [
        {

            story: myData.value.Description,
            choice: [
              
            ],
            round: 10
        }
    ]
);


async function selectOption(next: number, choice: string) {

    try {
        const response = await axios.post("/api/v1/game/chat", {
            apiKey: apiKey.value,
            choiceID: choice,//A,B,C,D
            modelId: ModelId.value,
        })
        stories.value.push(response.data)
        currentStoryIndex.value = next;
        currentStoryIndex1.value = currentStoryIndex.value;
        loading.value=false
    } catch {
        ElMessage.info('请求出现故障，请稍等')
    }

}

onMounted(async () => {
    try {
        await db.open();
        const firtRecord = await db.Apikey.toCollection().first();

        if (firtRecord) {
            apiKey.value = firtRecord.apikey as string;
            ModelId.value = firtRecord.model as string
        }

        if (apiKey.value != '' && ModelId.value != '') {
            const response = await axios.post('/api/v1/game/new', {
                apiKey: apiKey.value,
                gameId: myData.value.GameId,
                modelId: ModelId.value
            })

            stories.value.push(response.data);
            currentStoryIndex.value++;
            currentStoryIndex1.value=currentStoryIndex.value
        }
    } finally {
        db.close();
    }
})



</script>

<style scoped>
.notebook {
    width: 100%;
    display: flex;
    height: 500px;
    flex-direction: row;
    justify-content: center;
    background-color: #F2E9D3;
    border: 10px solid #8B5B34;
    box-shadow: 5px 5px 5px #888888;
    margin: auto;

}

.left-pane {

    padding: 20px;
    text-align: justify;
    width: 50%;

    border-right: 10px solid #c59f7f;

    display: flex;
    flex-direction: column;
    align-items: center;
}

.left-pane button {
    margin-top: auto;
}

.right-pane {
    width: 50%;
    flex-grow: 1;
    display: flex;
    align-items: center;
}

.right-pane .content {
    display: flex;
    flex-direction: column;
}

.right-pane .content1 {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.right-pane button {
    margin-top: auto;
}

h2,
p {
    margin: 0;
}

h2 {
    font-size: 36px;
    margin-bottom: 10px;
}

p {
    font-size: 20px;
    line-height: 1.5;
    margin-bottom: 30px;
}

button {
    display: block;
    margin-bottom: 10px;
    margin-left: 0px;
    padding: 5px 10px;
    font-size: 20px;
    background-color: #F2E9D3;
    border: none;
    box-shadow: 2px 2px 2px #888888;
    cursor: pointer;
}

button:hover {
    background-color: #8B5B34;
    color: #F2E9D3;
}
</style>
