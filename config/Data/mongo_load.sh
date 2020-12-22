
# if path isn't working, do path from the root
# run this command in terminal, not the mongo shell
# csv seems to work better

# mongoimport --db=planet-api-development --collection=planets --type=csv --headerline --drop --file=/Users/sidhantmathur/sei/projects/planet-api/config/plDataHabit.csv

# mongoexport --db=planet-api-development --collection=planets --type=csv --fields=row,pl_name,st_name,st_num,pl_num,dis_met,dis_year,dis_loc,dic_fac,pl_orbper,pl_orb,pl_rade,pl_radj,pl_masse,pl_massj,pl_temp,st_spectype,st_temp,st_rad,st_mass,glat,glon,sy_dist,habit,_id --out=projects/planets.csv

# commands to quickly export and import planet data