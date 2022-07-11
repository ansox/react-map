import  ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { Button } from 'antd'
import { BorderOuterOutlined, BorderInnerOutlined } from '@ant-design/icons';
import { createControlComponent } from '@react-leaflet/core'
import { Control, DomUtil } from 'leaflet'

const node = DomUtil.create('div');

Control.FitDataToBoundControl = Control.extend({
  options: {
    position: "topleft"
  },
  onAdd: function(map) {
    const doFitDataToBounds = () => {
      const latLngs = [];
      map.eachLayer(layer => {
        const latLng = layer.options.doFitToBounds &&
          layer.getLatLng();

        if (latLng) {
          latLngs.push(latLng);
        }
      })
      map.fitBounds(latLngs);
    }

    ReactDOM.render(
      <div className="fit-bounds-control-container">
        <Button
          title="Fit bounds to world"
          icon={<BorderInnerOutlined />}
          onClick={() => doFitDataToBounds()}
          className="leaflet-control-layers"
          style={{
            width: '33px',
            height: '33x',
            borderRadius: '4px',
          }}
        ></Button>
        <Button
          title="Fit bounds to world"
          icon={<BorderOuterOutlined />}
          onClick={() => map.fitWorld()}
          className="leaflet-control-layers"
          style={{
            width: '33px',
            height: '33x',
            borderRadius: '4px',
          }}
        >
          
        </Button>
      </div>,
      node
    )
    return node;
  },
  onRemove: function(map) {
    unmountComponentAtNode(node);
  }
})

export const FitDataToBoundControl = createControlComponent(
  (props) => new Control.FitDataToBoundControl(props),
)