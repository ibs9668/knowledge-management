# -*-coding:utf-8-*-

import sys
import json

reload(sys)
sys.path.append('../../')
from global_utils import es_event, event_analysis_name, event_type

# 获取事件参与者
def get_user_in_event(event_id):
    result = es_event.get(index=event_analysis_name, doc_type= event_type, id=event_id)["_source"]
    # trend_pusher
    trend_pusher = json.loads(result["trend_pusher"])

    # trend_maker
    trend_maker = json.loads(result["trend_maker"])

    # pagerank
    pagerank = json.loads(result["pagerank"])
    print len(trend_pusher), len(trend_maker), len(pagerank)

    f = open("event_user_list.txt", "a")
    for item in trend_pusher:
        f.write(str(item["uid"]))
        f.write("\n")

    for item in trend_maker:
        f.write(str(item["uid"]))
        f.write("\n")

    for item in pagerank:
        f.write(str(item))
        f.write("\n")

    f.close()

if __name__ == "__main__":
    get_user_in_event("yun-chao-che-ji-bi-nan-zi-huo-pei-chang-1482126431")
    get_user_in_event("min-jin-dang-yi-yuan-cheng-yao-qing-da-lai-dui-kang-da-lu-1482126431")
    get_user_in_event("xiang-gang-qian-zong-du-qian-ze-liang-you-er-ren-1482126431")
    get_user_in_event("huai-yun-nv-jiao-shi-bei-jia-chang-ou-da-1482079340")
    get_user_in_event("lao-tai-ao-ye-mai-cai-wei-er-zi-mai-fang-1482126431")
    get_user_in_event("xi-an-hu-shi-huai-yun-er-tai-bei-po-ci-zhi-1482126431")
    get_user_in_event("gong-an-bu-gua-pai-du-ban-shi-da-dian-xin-qi-zha-an-jian-1482127322")
    get_user_in_event("ao-men-xuan-ju-fa-xin-zeng-jia-ai-guo-tiao-li-1482126431")
    get_user_in_event("ma-lai-xi-ya-zhua-huo-dian-xin-qi-zha-an-fan-1482126431",)
    get_user_in_event("zhong-guo-zhi-shi-chan-quan-shen-qing-liang-shi-jie-di-yi-1482079340")


