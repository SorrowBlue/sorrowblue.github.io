import QiitaApi from "@/qiita-api/QiitaApi";
import { $axios, $axiosQiita } from "@/utils/api";
import { QiitaSchema } from "@/qiita-api/type/QiitaSchema";
import { QiitaTrendItem } from "@/qiita-api/type/QiitaTrendItem";

interface Entry {
  gsx$execute: {
    $t: string;
  };
}

interface Sheet {
  feed: {
    entry: Entry[];
  };
}

interface QiitaRawTrend {
  trend: {
    edges: QiitaTrendItem[];
  };
}

export default class QiitaScrap extends QiitaApi {
  /**
   * trend
   */
  public async trend(): Promise<Array<QiitaTrendItem>> {
    const res = await $axios.$get<Sheet>(
      "https://spreadsheets.google.com/feeds/list/12umj39h2rk9lg33KXVE5F2tOuWG3ocXgk8vQQ7GXtxg/od6/public/values?alt=json"
    );
    const raw: QiitaRawTrend = JSON.parse(
      res.feed.entry[0].gsx$execute.$t.replaceAll("\n", " ")
    );
    return raw.trend.edges;
  }

  async schema(locale: string = "ja"): Promise<QiitaSchema> {
    return await $axiosQiita.$get("/schema?locale=" + locale);
  }
}
