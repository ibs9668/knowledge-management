# -*- coding: utf-8 -*-

from flask import Blueprint, url_for, render_template, request, abort, flash, session, redirect
import json
import csv
import os
import time
from datetime import date
from datetime import datetime
import csv
from  knowledge.global_config  import relation_list,user_event_relation
from utils import group_tab_graph, group_tab_map
from py2neo import Node, Relationship, Graph, NodeSelector
from py2neo.packages.httpstream import http

mod = Blueprint('group', __name__, url_prefix='/group')

@mod.route('/')
def group():

    return render_template('group/groupore.html')

@mod.route('/detail/')
def show_group_detail():
    group_name = request.args.get('group_name', u'媒体')

    return render_template('group/grouptrue.html')

@mod.route('/comparison/')
def group_comparison():

    return render_template('group/groupdiff.html')

@mod.route('/group_node_filter/')
def group_node_filter():
    group_name = request.args.get('group_name', u'媒体')
    node_type = request.args.get('node_type', '')#User,Event
    relation_str = ','.join(relation_list)
    relation_type = request.args.get('relation_type',relation_str)
    relation_type_list = relation_type.split(',')
    relation_type_list.extend(user_event_relation)
    print relation_type_list,'!!!!!!!!'
    layer = request.args.get('layer','1') #'1' or '2'
    tab_graph_result = group_tab_graph(group_name, node_type, relation_type_list, layer)   
    return json.dumps(tab_graph_result)

@mod.route('/group_map_filter/')
def group_map_filter():
    group_name = request.args.get('group_name', u'媒体')
    node_type = request.args.get('node_type', '')#User,Event
    relation_str = ','.join(relation_list)
    relation_type = request.args.get('relation_type',relation_str)
    relation_type_list = relation_type.split(',')
    relation_type_list.extend(user_event_relation)
    layer = request.args.get('layer','1') #'1' or '2'
    tab_map_result = group_tab_map(group_name, node_type, relation_type_list, layer)   
    return json.dumps(tab_map_result)
