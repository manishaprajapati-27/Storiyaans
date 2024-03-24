import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const TabsSection = () => {
  return (
    <section className="section tabsection">
      <div className="container">
        <Tabs>
          <TabList>
            <Tab>Enterteniment</Tab>
            <Tab>World</Tab>
            <Tab>Life Style</Tab>
            <Tab>Technology</Tab>
            <Tab>Travel</Tab>
          </TabList>

          <TabPanel>
            <div className="text">
              <h2>Any content 1</h2>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="text">
              <h2>Any content 2</h2>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="text">
              <h2>Any content 3</h2>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="text">
              <h2>Any content 4</h2>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="text">
              <h2>Any content 5</h2>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default TabsSection;
