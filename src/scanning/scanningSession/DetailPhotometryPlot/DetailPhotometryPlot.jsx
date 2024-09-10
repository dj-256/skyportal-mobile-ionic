import "./DetailPhotometryPlot.scss";
import { useEffect, useRef, useState } from "react";
import { useBandpassesColors } from "../../../common/hooks.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../common/constants.js";
import { fetchSourcePhotometry } from "../../scanningRequests.js";
import { getPreference } from "../../../common/preferences.js";
import { getVegaPlotSpec } from "../../scanningLib.js";
import embed from "vega-embed";

/**
 * @param {Object} props
 * @param {string} props.candidateId
 * @returns {JSX.Element}
 */
export const DetailPhotometryPlot = ({ candidateId }) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  /** @type {React.MutableRefObject<HTMLDivElement|null>} */
  const container = useRef(null);
  const { bandpassesColors } = useBandpassesColors();

  const { data: photometry } = useQuery({
    queryKey: [QUERY_KEYS.SOURCE_PHOTOMETRY, candidateId],
    queryFn: async () => {
      const userInfo = await getPreference({ key: QUERY_KEYS.USER_INFO });
      return await fetchSourcePhotometry({
        sourceId: candidateId,
        instanceUrl: userInfo.instance.url,
        token: userInfo.token,
      });
    },
  });

  const unmountVega = useRef(() => {});
  /** @type {React.MutableRefObject<NodeJS.Timeout|undefined>} */
  const revealTimeout = useRef(undefined);

  const mountMutation = useMutation({
    mutationFn: async () => {
      const userInfo = await getPreference({ key: QUERY_KEYS.USER_INFO });
      const photometry = await fetchSourcePhotometry({
        sourceId: candidateId,
        instanceUrl: userInfo.instance.url,
        token: userInfo.token,
      });
      if (!container.current || !bandpassesColors || !photometry) {
        throw new Error("Missing parameters");
      }
      const response = await embed(
        // @ts-ignore
        container.current,
        getVegaPlotSpec({
          photometry,
          titleFontSize: 13,
          labelFontSize: 11,
          // @ts-ignore
          bandpassesColors,
        }),
        {
          actions: false,
        },
      );
      unmountVega.current = response.finalize;
    },
    onSuccess: () => {
      revealTimeout.current = setTimeout(() => {
        setHasLoaded(true);
      }, 300);
    },
  });

  useEffect(() => {
    if (!photometry || !container.current || !bandpassesColors) {
      return;
    }
    mountMutation.mutate();
    return () => {
      unmountVega.current();
    };
  }, [photometry, photometry, bandpassesColors]);

  return (
    <div className="detail-photometry-plot">
      <div ref={container} className="canvas-container" />
    </div>
  );
};
