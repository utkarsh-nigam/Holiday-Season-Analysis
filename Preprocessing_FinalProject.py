import pandas as pd
import numpy as np
import datetime as dt
import os

os.chdir("/Users/utkarshvirendranigam/Documents")
#print(os.listdir("/Users/utkarshvirendranigam/Documents"))
file_availablity=os.listdir("/Users/utkarshvirendranigam/Documents")

'''
# reading the raw data files and merging them into one dataframe
files_name=["2019-Jan.csv","2019-Feb.csv","2019-Mar.csv","2019-Apr.csv","2019-May.csv","2019-Jun.csv","2019-Jul.csv","2019-Aug.csv","2019-Sep.csv","2019-Oct.csv","2019-Nov.csv","2019-Dec.csv", "2020-Jan.csv", "2020-Feb.csv", "2020-Mar.csv", "2020-Apr.csv"]
#data_frame=pd.DataFrame()
flag=0
for file in files_name:
    if file in file_availablity:
        temp_df=pd.read_csv(file)
        print(temp_df.shape)
        if flag==0:
            data_frame=temp_df.copy()
            flag=1
        else:
            data_frame=data_frame.append(temp_df)


print(data_frame.shape)
'''









data_frame=pd.read_csv("compiled_data.csv")
print(data_frame.shape)

data_frame.drop(columns=["category_id"],inplace=True)
#data_frame.to_csv("compiled_data.csv", index=False)
print(data_frame.columns)

device_type=data_frame[["user_session"]]
print(device_type.shape)
device_type.drop_duplicates(inplace=True)
print(device_type.shape)

device_type["device_type"] = np.random.choice(["Mobile", "Desktop", "Tablet"], len(device_type), p=[0.52, 0.37, 0.11])
print(device_type["device_type"].unique())

data_frame=pd.merge(data_frame,device_type,how="left",on=["user_session"])



location_type=data_frame[["user_id"]]
print(location_type.shape)
location_type.drop_duplicates(inplace=True)
print(location_type.shape)

location_type["State"] = np.random.choice(["California", "Texas", "New York", "Massachusetts", "Illinois", "New Jersey", "Pennsylvania", "Florida", "Connecticut", "Washington", "Delaware", "Ohio", "Alaska", "Maryland", "Virginia", "North Dakota", "Minnesota", "Colorado", "Georgia", "Wyoming", "North Carolina", "Michigan", "Oregon", "Nebraska", "Wisconsin", "Indiana", "Iowa", "New Hampshire", "Hawaii", "Tennessee", "Missouri", "Kansas", "Louisiana", "Oklahoma", "South Dakota", "Rhode Island", "Utah", "Arizona", "Nevada", "Kentucky", "Vermont", "Alabama", "New Mexico", "South Carolina", "Maine", "Montana", "Arkansas", "West Virginia", "Idaho", "Mississippi"], len(location_type), p=[0.041,0.034,0.033,0.027,0.025,0.024,0.024,0.026,0.024,0.023,0.022,0.022,0.022,0.022,0.022,0.022,0.021,0.021,0.021,0.021,0.02,0.02,0.02,0.019,0.019,0.019,0.019,0.019,0.018,0.018,0.018,0.018,0.018,0.017,0.017,0.017,0.017,0.017,0.017,0.016,0.015,0.015,0.015,0.015,0.014,0.014,0.014,0.013,0.013,0.012])
data_frame=pd.merge(data_frame, location_type,how="left",on=["user_id"])
data_frame["event_time"]= pd.to_datetime(data_frame['event_time'], errors='coerce')






del location_type,device_type
# processing data for overall holiday season impact

writer_overall = pd.ExcelWriter("Overall Data.xlsx")


# visits data

temp_df_1=data_frame.copy()
temp_df_1=temp_df_1[temp_df_1["event_type"]=="view"] # filtering data to calculate total visits

temp_df_1["event_time"]= pd.to_datetime(temp_df_1['event_time'], errors='coerce')
temp_df_1["Date"]=temp_df_1["event_time"].dt.date
print(temp_df_1.dtypes)

my_pt = pd.pivot_table(temp_df_1, index=["Date"], values=["user_session"], columns=["device_type"], aggfunc="count")
visits_data = pd.DataFrame(my_pt.to_records())
visits_data = visits_data.rename(columns={"('user_session', 'Mobile')": "Mobile", "('user_session', 'Desktop')": "Desktop", "('user_session', 'Tablet')": "Tablet"}) # renaming the column names
visits_data = visits_data.fillna(0)
visits_data.to_excel(writer_overall, 'Visits') # writing the dataframe to excel sheet

writer_overall.save() #saving the excel file
del visits_data,temp_df_1

# orders data





temp_df_2=data_frame.copy()
temp_df_2=temp_df_2[temp_df_2["event_type"]=="purchase"] # filtering data to calculate total orders
temp_df_2["Date"]=temp_df_2["event_time"].dt.date
my_pt = pd.pivot_table(temp_df_2, index=["Date"], values=["user_session"], columns=["device_type"], aggfunc="count")
orders_data = pd.DataFrame(my_pt.to_records())
orders_data = orders_data.rename(columns={"('user_session', 'Mobile')": "Mobile", "('user_session', 'Desktop')": "Desktop", "('user_session', 'Tablet')": "Tablet"}) # renaming the column names
orders_data = orders_data.fillna(0)
orders_data.to_excel(writer_overall, 'Orders') # writing the dataframe to excel sheet

writer_overall.save() #saving the excel file
#del orders_data,temp_df_2

# revenue data
temp_df_3=data_frame.copy()
temp_df_3=temp_df_3[temp_df_3["event_type"]=="purchase"] # filtering data to calculate total orders
temp_df_3["Date"]=temp_df_3["event_time"].dt.date
my_pt = pd.pivot_table(temp_df_3, index=["Date"], values=["price"], columns=["device_type"], aggfunc="sum")
revenue_data = pd.DataFrame(my_pt.to_records())
revenue_data = revenue_data.rename(columns={"('price', 'Mobile')": "Mobile", "('price', 'Desktop')": "Desktop", "('price', 'Tablet')": "Tablet"}) # renaming the column names
revenue_data = revenue_data.fillna(0)
revenue_data.to_excel(writer_overall, 'Revenue') # writing the dataframe to excel sheet

writer_overall.save() #saving the excel file



writer_overall = pd.ExcelWriter("Overall DataRevenue.xlsx")

writer_overall = pd.ExcelWriter("Overall Data Sensitivity.xlsx")
#del revenue_data,temp_df_3
# holiday sensitivity categories

temp_df_4=data_frame.copy()
temp_df_4["Date"]=temp_df_4["event_time"].dt.date
#temp_df_4=temp_df_4[temp_df_4["event_time"]<=datetime.date(2016,1,1)] # filtering data only for 2019
temp_df_4["Season"] = ""
temp_df_4.loc[temp_df_4["Date"]<=dt.date(2019,10,31), 'Season'] = "Non Holiday"
temp_df_4.loc[temp_df_4["Date"]>=dt.date(2019,11,1), 'Season'] = "Holiday"

temp_df_4_1=temp_df_4.copy()
temp_df_4_1=temp_df_4_1[temp_df_4_1["event_type"]=="purchase"] # filtering data to only for orders
my_pt = pd.pivot_table(temp_df_4_1, index=["category_code"], values=["user_session"], columns=["Season"], aggfunc="count")
season_data1 = pd.DataFrame(my_pt.to_records())
season_data1 = season_data1.rename(columns={"category_code": "Category", "('user_session', 'Holiday')": "Holiday", "('user_session', 'Non Holiday')": "Non Holiday"}) # renaming the column names
season_data1 = season_data1.fillna(0)
season_data1["Sensitivity"] = (season_data1["Holiday"]/ (season_data1["Holiday"] + season_data1["Non Holiday"]))*100
season_data1.to_excel(writer_overall, 'Holiday Sensitivity') # writing the dataframe to excel sheet

season_data1=season_data1.nlargest(5,['Sensitivity'])

temp_df_4_2=temp_df_4.copy()
temp_df_4_2=temp_df_4_2[temp_df_4_2["event_type"]=="purchase"]
temp_df_4_2=temp_df_4_2[temp_df_4_2["Season"]=="Holiday"]
my_pt = pd.pivot_table(temp_df_4_1, index=["category_code"], values=["user_session","price"], aggfunc={"user_session": "count", "price": "sum"})
season_data2 = pd.DataFrame(my_pt.to_records())
season_data2 = season_data2.rename(columns={"category_code": "Category", "user_session": "Orders", "price": "Revenue"}) # renaming the column names
season_data2 = season_data2.fillna(0)
season_data2["Order Share"]=(season_data2["Orders"]/(season_data2["Orders"].sum()))*100
season_data2["Revenue Share"]=(season_data2["Revenue"]/(season_data2["Revenue"].sum()))*100
print(season_data2)
season_data=season_data1.join(season_data2,how="left",on="Category") #joining the two dataframes on category
season_data2.to_excel(writer_overall, 'Holiday Sensitivity2') # writing the dataframe to excel sheet

writer_overall.save() #saving the excel file




# processing data for each campaign

campaign_names=["Deals","Gifting","Holiday Ready","Toys"]
days_list=["Wednesday", "Thanksgiving", "Black Friday", "Cyber Monday"]
count=1
for campaign in campaign_names:
    writer = pd.ExcelWriter("Campaign Data.xlsx")

    tempdf=data_frame.copy()
    #tempdf=tempdf[tempdf["Campaign"]==campaign] # filtering the specific campaign data


    # processing data for Campaign Visualization 1

    df1=tempdf[tempdf["event_type"]=="purchase"]
    df1=df1[(df1["event_time"]>="11/1/19")&(df1["event_time"]<="12/31/19")] # filtering data only for Nov and Dec 2019
    df1["Day"]=df1["event_time"].dt.date
    my_pt = pd.pivot_table(df1, index=["Day"], values=["price"], columns=["device_type"], aggfunc="sum")
    trended_data = pd.DataFrame(my_pt.to_records())
    trended_data = trended_data.rename(columns={"('price', 'Mobile')": "Mobile", "('price', 'Desktop')": "Desktop", "('price', 'Tablet')": "Tablet"}) # renaming the column names
    trended_data = trended_data.fillna(0)
    trended_data.to_excel(writer, 'Trended') # writing the dataframe to excel sheet


    # processing data for Campaign Visualization 2

    df2 = tempdf[tempdf["event_type"].isin(["purchase","view"])]
    df2 = df2[df2["channel_type"].isin(["Paid", "Unpaid"])]
    df2=df2[(df2["event_time"]>="11/1/19")&(df2["event_time"]<="12/31/19")] # filtering data only for Nov and Dec 2019
    df2["Day"] = df2["event_time"].dt.date

    my_pt = pd.pivot_table(df2, index=["Day"], values=["user_session"], columns=["event_type"],aggfunc=np.count)
    paidvsunpaid_data1 = pd.DataFrame(my_pt.to_records())
    paidvsunpaid_data1 = paidvsunpaid_data1.rename(columns={"('user_session', 'view')": "Visits", "('user_session', 'purchase')": "Orders"})  # renaming the column names
    paidvsunpaid_data1 = paidvsunpaid_data1.fillna(0)
    paidvsunpaid_data1["CR"]=paidvsunpaid_data1["Orders"]/paidvsunpaid_data1["Visits"] #calculating the conversion rate
    paidvsunpaid_data1=paidvsunpaid_data1.drop(columns=["Orders","Visits"])

    df2_2=df2[df2["event_type"].isin(["view"])]
    my_pt = pd.pivot_table(df2_2, index=["Day"], values=["user_session"], columns=["channel_type"], aggfunc=np.count)
    paidvsunpaid_data2 = pd.DataFrame(my_pt.to_records())
    paidvsunpaid_data2 = paidvsunpaid_data2.rename(columns={"('user_session', 'Paid')": "Paid", "('user_session', 'Unpaid')": "Unpaid"}) # renaming the column names
    paidvsunpaid_data2 = paidvsunpaid_data2.fillna(0)

    paidvsunpaid_data=paidvsunpaid_data2.join(paidvsunpaid_data1,how="left",on="Day") #joining the two dataframes on date
    paidvsunpaid_data.to_excel(writer, 'Paid Vs Organic')  # writing the dataframe to excel sheet


    # processing data for Campaign Visualization 3
    print("Hello")
    df3 = tempdf[tempdf["event_type"] == "purchase"]
    print(df3["event_time"].head())
    df3["Day"] = df3["event_time"].dt.date
    df3=df3[df3["Day"]>= dt.date(year=2019,month=11,day=1)] # filtering data only for Nov and Dec 2019
    df3["Day Flag"]=""
    df3.loc[df3["Day"] == dt.date(2019,11,27), 'Day Flag'] = "Wednesday"
    df3.loc[df3["Day"] == dt.date(2019,11,28), 'Day Flag'] = "Thanksgiving"
    df3.loc[df3["Day"] == dt.date(2019,11,29), 'Day Flag'] = "Black Friday"
    df3.loc[df3["Day"] == dt.date(2019,12,2), 'Day Flag'] = "Cyber Monday"
    days_list = ["Wednesday", "Thanksgiving", "Black Friday", "Cyber Monday"]
    df3 = df3[df3["Day Flag"].isin(days_list)]
    topproducts_data=pd.DataFrame()
    for current_day in days_list:
        df3_1=df3[df3["Day Flag"] == current_day]
        print("here",df3_1)
        my_pt = pd.pivot_table(df3_1, index=["Day Flag","product_id"], values=["user_session","price"], aggfunc={"user_session": "count", "price": "sum"})
        print("here", my_pt)
        topproducts_data1 = pd.DataFrame(my_pt.to_records())
        topproducts_data1 = topproducts_data1.rename(columns={"Day Flag": "Day", "product_id": "Product Name", "user_session": "Orders", "purchase": "Revenue"})  # renaming the column names
        topproducts_data1 = topproducts_data1.fillna(0)
        topproducts_data1 = topproducts_data1.nlargest(5, ['Orders'])
        if count==1:
            topproducts_data=topproducts_data1.copy()
            count=2
        else:
            topproducts_data=topproducts_data.append(topproducts_data1)
    topproducts_data.to_excel(writer, 'Category Top Products')  # writing the dataframe to excel sheet


    # processing data for Campaign Visualization 4
    df4=tempdf.copy()
    df4["Day"] = df4["event_time"].dt.date
    df4 = df4[df4["Day"] >= dt.date(year=2019, month=11, day=1)]  # filtering data only for Nov and Dec 2019
    df4["Hour"] = df4["event_time"].dt.hour
    df4["Day Flag"] = ""
    df4.loc[df4["Day"] == dt.date(2019,11,27), 'Day Flag'] = "Wednesday"
    df4.loc[df4["Day"] == dt.date(2019,11,28), 'Day Flag'] = "Thanksgiving"
    df4.loc[df4["Day"] == dt.date(2019,11,29), 'Day Flag'] = "Black Friday"
    df4.loc[df4["Day"] == dt.date(2019,12,2), 'Day Flag'] = "Cyber Monday"
    df4 = df4[df4["Day Flag"].isin(days_list)]
    df4["Hour Bracket"] = ""
    print(df4["Hour"].unique())
    df4.loc[df4["Hour"].isin([0,1,2,3]), 'Hour Bracket'] = "Bracket 1"
    df4.loc[df4["Hour"].isin([4,5,6,7]), 'Hour Bracket'] = "Bracket 2"
    df4.loc[df4["Hour"].isin([8,9,10,11]), 'Hour Bracket'] = "Bracket 3"
    df4.loc[df4["Hour"].isin([12,13,14,15]), 'Hour Bracket'] = "Bracket 4"
    df4.loc[df4["Hour"].isin([16,17,18,19]), 'Hour Bracket'] = "Bracket 5"
    df4.loc[df4["Hour"].isin([20,21,22,23]), 'Hour Bracket'] = "Bracket 6"

    my_pt = pd.pivot_table(df4, index=["Day Flag", "Hour Bracket"], values=["user_session"], columns=["event_type"], aggfunc="count")
    peaksalehours_data = pd.DataFrame(my_pt.to_records())
    peaksalehours_data = peaksalehours_data.rename(columns={"Day Flag": "Day", "('user_session', 'view')": "Visits", "('user_session', 'cart')": "ATC", "('user_session', 'purchase')": "Orders"})  # renaming the column names
    peaksalehours_data = peaksalehours_data.fillna(0)
    peaksalehours_data["CR"] = peaksalehours_data["Orders"] / peaksalehours_data["Visits"] #calculating the conversion rate
    peaksalehours_data["% ATC"] = peaksalehours_data["ATC"] / peaksalehours_data["Visits"] #calculating the add to cart rate

    peaksalehours_data.to_excel(writer, 'Peak Sale Hours') # writing the dataframe to excel sheet


    # processing data for Campaign Visualization 5

    df5 = tempdf[tempdf["event_type"] == "purchase"]
    df5["Day"] = df5["event_time"].dt.date
    df5 = df5[df5["Day"] >= dt.date(year=2019, month=11, day=1)]  # filtering data only for Nov and Dec 2019
    df5["Day Flag"] = ""
    df5.loc[df5["Day"] == dt.date(2019, 11, 27), 'Day Flag'] = "Wednesday"
    df5.loc[df5["Day"] == dt.date(2019, 11, 28), 'Day Flag'] = "Thanksgiving"
    df5.loc[df5["Day"] == dt.date(2019, 11, 29), 'Day Flag'] = "Black Friday"
    df5.loc[df5["Day"] == dt.date(2019, 12, 2), 'Day Flag'] = "Cyber Monday"
    df5 = df5[df5["Day Flag"].isin(days_list)]
    my_pt = pd.pivot_table(df4, index=["State"], values=["price"], columns=["Day Flag"], aggfunc="sum")
    geolocation_data = pd.DataFrame(my_pt.to_records())
    geolocation_data = geolocation_data.rename(columns={"Day Flag": "Day", "('price', 'Wednesday')": "Wednesday", "('price', 'Thanksgiving')": "Thanksgiving", "('price', 'Black Friday')": "Black Friday", "('price', 'Cyber Monday')": "Cyber Monday"})  # renaming the column names
    geolocation_data = geolocation_data.fillna(0)
    geolocation_data["Overall"] = geolocation_data["Wednesday"] + geolocation_data["Thanksgiving"] + geolocation_data["Black Friday"] + geolocation_data["Cyber Monday"]

    geolocation_data.to_excel(writer, 'Geo Location')  # writing the dataframe to excel sheet
    writer.save() #saving the excel file