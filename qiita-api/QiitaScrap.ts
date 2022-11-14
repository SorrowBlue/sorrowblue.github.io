import QiitaApi from "@/qiita-api/QiitaApi";
import { $axios, $axiosQiita } from "@/utils/api";
import { QiitaSchema } from "@/qiita-api/type/QiitaSchema";
import { QiitaTrendItem } from "@/qiita-api/type/QiitaTrendItem";

interface Sheet {
  range: string;
  majorDimension: string;
  values: string[][];
}

interface QiitaRawTrend {
  trend: {
    scope: String,
    trend: {
      edges: QiitaTrendItem[];
    },
    type: String
  };
}

export default class QiitaScrap extends QiitaApi {
  /**
   * trend
   */
  public async trend(): Promise<Array<QiitaTrendItem>> {
    const res = await $axios.$get<Sheet>(
      "https://sheets.googleapis.com/v4/spreadsheets/12umj39h2rk9lg33KXVE5F2tOuWG3ocXgk8vQQ7GXtxg/values/シート1?key=AIzaSyD9MhLrSHerJjfhPwt2_GioFdNtY3aUTIo"
    );
    const raw: QiitaRawTrend = JSON.parse(
      res.values[1][2].replaceAll("\n", " ")
    );
    return raw.trend.trend.edges;
  }

  async schema(locale: string = "ja"): Promise<QiitaSchema> {
    return await $axiosQiita.$get("/schema?locale=" + locale);
  }
}
